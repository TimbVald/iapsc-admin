
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return null;
  }

  return (
    <section className="p-4 lg:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 2xl:col-span-4">
          <UserMetaCard user={user} />
        </div>
        <div className="lg:col-span-7 2xl:col-span-8">
          <UserInfoCard user={user} />
        </div>
      </div>
    </section>
  );
}
