import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

export async function validateUser({
  customerEmail
}: {
  customerEmail: string;
}) {
  // Get customer's userId from mapping table.
  const { data: subscriptionData, error: noSubscriptionError } = await supabaseAdminClient
    .from('subscriptions')
    .select('subscription_id')
    .eq('user_email', customerEmail)

  if (noSubscriptionError) throw noSubscriptionError

  if (!subscriptionData.length) return false;

  const { subscription_id: subscriptionId } = subscriptionData[0];

  const subscription = await stripeAdmin.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  });

  if (subscription.status === 'active' || subscription.status === 'trialing') {
    return true;
  } else {
    return false;
  }
}