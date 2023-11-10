import MetaHead from "@/components/MetaHead/metahead";
import ChangePassPage from "@/components/elements/card/carChangePass";
import LayoutAuth from "@/components/layout/layout_auth";
export default function ChangePassword() {
  return (
    <>
      <MetaHead
        title="Change Password"
        description="Welcome to Change Password"
      />
      <LayoutAuth>
        <ChangePassPage />
      </LayoutAuth>
    </>
  );
}
