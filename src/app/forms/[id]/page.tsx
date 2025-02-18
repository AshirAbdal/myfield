// app/forms/[id]/page.tsx
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";

export default async function FormDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return notFound();
  }

  const form = await FirstFormData.findOne({
    _id: params.id,
    user_id: session.user.id,
  });

  if (!form) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{form.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Add your form details here */}
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
}