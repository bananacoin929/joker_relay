import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';
import { toDateTime } from '@/utils/to-date-time';

export async function upsertUserSubscription({
  subscriptionId,
  customerEmail,
}: {
  subscriptionId: string;
  customerEmail: string;
  isCreateAction?: boolean;
}) {
  const subscription = await stripeAdmin.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  });

  let trial = Boolean(subscription.trial_end), monthly = false;

  const { data, error: noSubscriptionError } = await supabaseAdminClient
  .from('subscriptions')
  .select('subscription_id')
  .eq('user_email', customerEmail)

  if (noSubscriptionError) throw noSubscriptionError;
  if (data.length === 0) {
    if (trial) {
      monthly = false
    } else {
      trial = true;
      monthly = true;
    }
  } else {
    if (!trial) {
      trial = true;
      monthly = true;
    }
  }
  
  const subscriptionData = {
    user_email: customerEmail,
    subscription_id: subscription.id,
    trial,
    monthly
  }
  
  const result = await supabaseAdminClient.from('subscriptions').upsert([subscriptionData]);

  if (result.error) {
    throw result.error;
  }
  console.info(`Inserted/updated subscription [${subscription.id}] for user [${customerEmail}]`);

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  // if (isCreateAction && subscription.default_payment_method && userEmail) {
  //   await copyBillingDetailsToCustomer(userEmail, subscription.default_payment_method as Stripe.PaymentMethod);
  // }
}

// const copyBillingDetailsToCustomer = async (userId: string, paymentMethod: Stripe.PaymentMethod) => {
//   const customer = paymentMethod.customer;
//   if (typeof customer !== 'string') {
//     throw new Error('Customer id not found');
//   }

//   const { name, phone, address } = paymentMethod.billing_details;
//   if (!name || !phone || !address) return;

//   await stripeAdmin.customers.update(customer, { name, phone, address: address as AddressParam });

//   const { error } = await supabaseAdminClient
//     .from('users')
//     .update({
//       billing_address: { ...address },
//       payment_method: { ...paymentMethod[paymentMethod.type] },
//     })
//     .eq('id', userId);

//   if (error) {
//     throw error;
//   }
// };
