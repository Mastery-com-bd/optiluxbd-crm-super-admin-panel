import LoginComponent from "@/components/auth/login/LoginComponent";
import LoginText from "@/components/auth/login/LoginText";

const LoginPage = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-x-6 lg:gap-x-56">
      <LoginText />
      <LoginComponent />
    </section>
  );
};

export default LoginPage;
