import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import LoginComponent from "@/Components/LoginComponent";
import styles from '../Components/LoginComponent/LoginComponent.module.css';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        if (Cookies.get("token")) {
            router.push("/")
        }
    }, [])
    
    return (
        <div className={styles.LoginContainer}>
      <LoginComponent/></div>
    );
  }
  