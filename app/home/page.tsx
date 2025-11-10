import { EditorLayout } from "@/components/editor/EditorLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { EditorBottomBar } from "@/components/editor/editor-bottom-bar";

/**
 * Editor Page - Public Access
 * 
 * This page is now publicly accessible without authentication.
 */
export default async function EditorPage() {
  return (
    <>
      <ErrorBoundary>
        <EditorLayout />
      </ErrorBoundary>
      <EditorBottomBar />
    </>
  );
}
