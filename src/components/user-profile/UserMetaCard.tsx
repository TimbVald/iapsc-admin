"use client";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { Pen, Loader2 } from "lucide-react";
import DropzoneComponent from "../form/form-elements/DropZone";
import Button from "../ui/button/Button";

const UserMetaCard = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadController, setUploadController] = useState<AbortController | null>(
    null
  );

  // Fetch the current authenticated user on mount and whenever supabase instance changes.
  // Populates local state with the user's metadata (first_name, last_name, full_name).
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        setFormData({
          first_name: data.user.user_metadata.first_name || "",
          last_name: data.user.user_metadata.last_name || "",
        });
      }
    };

    fetchUser();
  }, [supabase]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropzoneChange = (files: File[]) => {
    const file = files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        toast.error(
          "Type de fichier non valide. Veuillez sélectionner une image (JPEG, PNG, GIF)."
        );
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Le fichier est trop volumineux. La taille maximale est de 5 Mo.");
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    try {
      const { data: updatedUser, error: updateUserError } = await supabase.auth.updateUser({
          data: { ...formData },
        });

      if (updateUserError) {
        throw new Error(`Error updating profile: ${updateUserError.message}`);
      }

      if(updatedUser) {
          setUser(updatedUser.user);
      }

      if (avatarFile) {
        setIsUploading(true);
        setUploadError(null);
        setUploadProgress(0);
        const controller = new AbortController();
        setUploadController(controller);

        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);

        try {
          const response = await fetch("/api/user/avatar", {
            method: "POST",
            body: avatarFormData,
            signal: controller.signal,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Avatar upload failed");
          }

          const { user: updatedUserWithAvatar } = await response.json();
          setUser(updatedUserWithAvatar);
          toast.success("Avatar updated successfully!");
          setAvatarFile(null);
          setAvatarPreview(null);
        } catch (error: any) {
          if (error.name === "AbortError") {
            toast.warning("Avatar upload cancelled.");
          } else {
            setUploadError(error.message);
            toast.error(`Error: ${error.message}`);
          }
        } finally {
          setIsUploading(false);
          setUploadController(null);
        }
      }

      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!user) {
    return <div>Chargement...</div>; // Or a skeleton loader
  }

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="relative w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image
                width={80}
                height={80}
                src={user.user_metadata.avatar_url || "/images/user/owner.jpg"}
                alt="user"
              />
              <button
                onClick={openModal}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity"
              >
                <Pen size={24} className="text-white" />
              </button>
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user.user_metadata.first_name} {user.user_metadata.last_name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-2xl flex flex-col max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">Modifier le profil</h2>
            <div className="overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <div className="relative w-full mx-auto mb-4">
                <DropzoneComponent onFilesChange={handleDropzoneChange} />
                {avatarPreview && (
                  <div className="flex justify-center items-center mt-4 w-32 h-32 relative">
                    <Image
                      src={avatarPreview}
                      alt="Aperçu de l'avatar"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Prénom"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Nom"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Réseaux sociaux</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              </div>

              {isUploading && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <Button
                    onClick={() => uploadController?.abort()}
                    className="mt-2 text-sm text-red-500"
                  >
                    Cancel
                  </Button>
                </div>
              )}
              {uploadError && (
                <p className="mt-2 text-sm text-red-500">{uploadError}</p>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={closeModal}
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || isUploading}
              >
                {isSaving || isUploading ? (
                  <span className="flex items-center"><Loader2 className="w-4 h-4 animate-spin mr-2" /> Save...</span>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMetaCard;
