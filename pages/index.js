import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { BlogComponent } from "@/Components/BlogComponent";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get("token")) {
            router.push("/login")
        }
    }, [])
    
    return (
      <div>
        <BlogComponent/>
      </div>
    );
  }
  