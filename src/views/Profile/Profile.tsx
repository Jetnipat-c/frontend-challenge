"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Skeleton } from "@components/ui/skeleton";
import UserStore from "@store/user/user.store";

const ProfileView = () => {
  const { user } = UserStore();
  return (
    <div className="grid gap-4 sm:grid-cols-3 bg-muted rounded-md p-4">
      <Avatar className="h-20 w-20 mx-auto">
        {user.photoURL && <AvatarImage src={user.photoURL} alt="avatar" />}
        <AvatarFallback>
          <Skeleton className="h-20 w-20 rounded-full" />
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Name</h4>
          <p className="text-sm text-muted-foreground">{user.displayName}</p>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Email</h4>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Creation time</h4>
          <p className="text-sm text-muted-foreground">
            {user.metadata?.creationTime}
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">
            Last sign-in time
          </h4>
          <p className="text-sm text-muted-foreground">
            {user.metadata?.lastSignInTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
