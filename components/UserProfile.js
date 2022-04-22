import Image from "next/image";

// UI component for user profile
export default function UserProfile({ userImg }) {
  return (
    <div className="lg:top-70 absolute top-64 w-full">
      <div className="flex justify-center">
        <Image priority src={userImg} height={100} width={100} />
      </div>
    </div>
    //
  );
}
