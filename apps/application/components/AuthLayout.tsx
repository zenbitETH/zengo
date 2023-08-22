import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "./Layout";

// import { Spinner } from "@/f/components/spinner";

interface AuthGuardLayoutProps {
  children: React.ReactNode;
}

export const AuthGuardLayout: React.FC<AuthGuardLayoutProps> = ({
  children,
}) => {
  const address = useAddress();
  const router = useRouter();

  useEffect(() => {
    if (!address /* && !isSessionLoading */) {
      router.push("/");
    }
  }, [address]);

  if (!address) {
    return (
      <div className="flex flex-col items-center min-h-screen mt-16 pt-16 space-y-4">
        {/* <Spinner /> */}
        <span className="text-sm text-gray-600">Getting things ready..</span>
      </div>
    );
  }

  // prevent any flicker
  if (!address) {
    return <>{null}</>;
  }

  return <>{children}</>;
};
