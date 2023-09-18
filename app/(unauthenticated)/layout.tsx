import { BackgroundImage } from "../_components/background-image";

export default async function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BackgroundImage>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </BackgroundImage>
  );
}
