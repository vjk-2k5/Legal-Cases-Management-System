'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Correct import for useRouter
import { Button, Input, Spacer } from "@nextui-org/react"; // Importing Button, Input, and Spacer from Next UI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; 
import { FaGoogle, FaLinkedin } from "react-icons/fa"; 
import { GithubIcon } from "@/components/icons"; 
import { title } from "@/components/primitives";
import { useState } from "react";
export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";



  export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string>(''); 
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
      console.log(email);
      try {
        const response = await fetch('http://localhost:5000/lcms/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        console.log(response);
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Login failed');
          return;
        }
  
        const data = await response.json();
  
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user_id', data.user.user_id);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('name', data.user.first_name);

        switch (data.user.role) {
          case 'client':
            router.push('/clients/dashboard');
            break;
          case 'lawyer':
            router.push('/lawyers/dashboard');
            break;
          default:
            router.push('/');
            break;
        }

      } catch (error) {
        setError('An error occurred during login');
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image.jpeg')] bg-cover bg-center">
      <Card className="mx-auto max-w-md bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "blue" })}>Legal Cases MS</h2>
        </CardHeader>
        <CardBody>
          <form className="grid gap-4" onSubmit={handleLogin}>
            <div className="grid gap-3">
              <Input
                id="email"
                type="email"
                label="Email"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
              />
              <Input
                id="password"
                type="password"
                label="Password"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
              />
            </div>
            <Button 
              type="submit" 
              className="mt-3 border border-white-500" 
              color="gradient" 
              auto
            >
              Login
            </Button>
            <div className="flex items-center my-3">
              <hr className="flex-grow border-t border-gray-500" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-t border-gray-500" />
            </div>
            <Button
              type="button"
              className="mt-2 border border-white-500 flex items-center justify-center"
              color="gradient"
              auto
            >
              <GithubIcon className="mr-2" />
              Login with GitHub
            </Button>
            <Button
              type="button"
              className="mt-2 border border-white-500 flex items-center justify-center"
              color="gradient"
              auto
            >
              <FaGoogle className="mr-2" />
              Login with Google
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/sign-up" legacyBehavior>
              <a className="text-blue-300">Sign up</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}