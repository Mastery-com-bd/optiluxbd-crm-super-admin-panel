'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TiptapEditor from "@/components/shared/TiptapEditor";
import { toast } from "sonner";
import { createContent, updateContent } from "@/service/content";
import { TContent } from "@/types/content";
import { useForm } from "react-hook-form";
import { useEffect } from "react";


export default function ManipulateContent({ content, setOpen }: { content?: TContent | null, setOpen?: (open: boolean) => void }) {

  const isUpdate = !!content;

  const contentFormSchema = z.object({
    key: isUpdate ? z.string().optional() : z.string().min(2, "Key must be at least 2 characters"),
    title: z.string().min(2, "Title must be at least 2 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    isActive: isUpdate ? z.boolean().optional() : z.boolean(),
  });

  type ContentFormValues = z.infer<typeof contentFormSchema>;

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      key: content?.key || "",
      title: content?.title || "",
      content: content?.content || "",
      isActive: content?.isActive ?? true,
    },
  });

  // Update form values when content changes
  useEffect(() => {
    if (content) {
      form.reset({
        title: content.title,
        content: content.content,
      });
    }
  }, [content, form]);

  async function onSubmit(values: ContentFormValues) {
    const toastId = toast.loading(isUpdate ? "Updating content..." : "Creating content...");
    try {
      const res = isUpdate && content?.id
        ? await updateContent(content.id, { title: values.title, content: values.content })
        : await createContent(values as TContent);  

      if (res.success) {
        toast.success(res.message || `Content ${isUpdate ? 'updated' : 'created'} successfully`, { id: toastId });
        if (isUpdate && setOpen) setOpen(false);
        else form.reset();
      } else {
        toast.error(res.message || `Failed to ${isUpdate ? 'update' : 'create'} content`, { id: toastId });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { id: toastId });
      console.error("Error with content:", error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Key Field - Only show in create mode */}
          {!isUpdate && (
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. privacy_policy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Privacy Policy"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content Field with TiptapEditor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Start typing your content..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IsActive Switch - Only show in create mode */}
          {!isUpdate && (
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Active Status
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Make this content visible to users
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">
              {isUpdate ? "Update Content" : "Create Content"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}