import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import styles from "./LoginComponent.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const LoginSchema = Yup.object().shape({
  UserName: Yup.string().required("Username is required"),
  Password: Yup.string().required("Password is required"),
});

export default function LoginComponent() {
    const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (data) => {
      Cookies.set("token", 1234);
      router.push("/")
  };

  return (
    <Formik
      initialValues={{ UserName: "", Password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        handleSubmit(values);
      }}
    >
      {({ values, touched, errors, isSubmitting, handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit} style={{ width: "300px"}}>
            <div className={`${styles.FormGroup} form-group`}>
              <div className={styles.PhoneNumberField}>Enter User Name</div>
              <Field
                type="text"
                name="UserName"
                value={values.UserName}
                placeholder="Enter here.."
                style={{ width: "100%", outline: "none" }}
                onWheel={(e) => e.target.blur()}
                className={`p-3 ${
                  touched.UserName && errors.UserName
                    ? "form-control is-invalid"
                    : `${styles.FormStyle}`
                }`}
              />
              <ErrorMessage
                component="div"
                name="UserName"
                className="invalid-feedback"
              />
            </div>

            <div className={`${styles.FormGroup} form-group`}>
              <div className={styles.PhoneNumberField}>Enter Password</div>
              <Field
                type="password"
                name="Password"
                style={{ width: "100%", alignItems: "center", outline: "none" }}
                value={values.Password}
                placeholder="Enter Your Password"
                className={`p-3 ${
                  touched.Password && errors.Password
                    ? "form-control is-invalid"
                    : `${styles.FormStyle}`
                }`}
              />
              <ErrorMessage
                component="div"
                name="Password"
                className="invalid-feedback"
              />
            </div>
            <button
              type="submit"
              className={`btn btn-dark ${styles.ClickButton}`}
              disabled={isLoading}
            >
              Continue
            </button>
            <div className={styles.PasswordForgot}>
              Login With:{" "}
              <span
                className={styles.Forgotpassword}
                onClick={() => router.push("/register")}
              >
                Gmail
                    </span>
                    <span
                className={styles.Forgotpassword}
                onClick={() => router.push("/register")}
              >
                GitHub
              </span>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
