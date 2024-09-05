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
    .select('id')
    .eq('user_email', customerEmail)

  if (noSubscriptionError) throw noSubscriptionError

  if (!subscriptionData.length) return false;

  const { id: subscriptionId } = subscriptionData[0];

  const subscription = await stripeAdmin.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  });

  const currentTime = new Date().getTime() / 1000;

  return Boolean(subscription.current_period_end - currentTime > 0);

}