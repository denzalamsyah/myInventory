import MetaHead from "@/components/MetaHead/metahead";
import ChangePassPage from "@/components/elements/card/carChangePass";
import LayoutAuth from "@/components/layout/layout_auth";
export default function ChangePassword() {
  const ChangePassword = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/set-password`, {
        method: "GET",
        body: JSON.stringify({ email }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
