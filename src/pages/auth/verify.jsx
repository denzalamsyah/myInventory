import MetaHead from "@/components/MetaHead/metahead";
import VerifyPage from "@/components/elements/card/cardVerify";
import LayoutAuth from "@/components/layout/layout_auth";

export default function Verify() {
  return (
    <>
      <MetaHead title="Verify" description="Welcome to Verify" />
      <LayoutAuth>
        <VerifyPage />
      </LayoutAuth>
    </>
  );
}
