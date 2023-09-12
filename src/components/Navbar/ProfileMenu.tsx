"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { navbarMenu } from "@constants/navbarMenu.constant";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import UserStore from "@store/user/user.store";
import { auth } from "@lib/firebase-config";
import { signOut } from "firebase/auth";
import { deleteCookie } from "cookies-next";
import { ACCESS_TOKEN_KEY } from "@constants/common.constant";
import { useRouter } from "next/navigation";

const ProfileMenu = () => {
  const { user } = UserStore();
  const router = useRouter();

  const signOutAcc = () => {
    signOut(auth);
    deleteCookie(ACCESS_TOKEN_KEY, { path: "/", domain: "localhost" });
    router.push("/signin");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-transparent">
        <Button variant="ghost" className="p-2">
          <Avatar className="mr-2 w-8 h-8">
            {user.photoURL && <AvatarImage src={user.photoURL} alt="avatar" />}
            <AvatarFallback>
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
          {user.displayName ? (
            <p className="hidden sm:inline-block">{user.displayName}</p>
          ) : (
            <Skeleton className="h-4 w-32" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navbarMenu.map((menu, idx) => (
          <Link href={menu.path} key={idx}>
            <DropdownMenuItem>{menu.name}</DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOutAcc()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
