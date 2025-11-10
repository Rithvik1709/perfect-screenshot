"use client";

import * as React from "react";
import { EditorLeftPanel } from "./editor-left-panel";
import { EditorRightPanel } from "./editor-right-panel";
import { EditorContent } from "./EditorContent";
import { EditorCanvas } from "@/components/canvas/EditorCanvas";
import { EditorStoreSync } from "@/components/canvas/EditorStoreSync";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import { EditorHeader } from "./EditorHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

function EditorMain() {
  const isMobile = useIsMobile();
  const [leftPanelOpen, setLeftPanelOpen] = React.useState(false);
  const [rightPanelOpen, setRightPanelOpen] = React.useState(false);

  return (
  // Make the editor occupy the viewport and be fixed so the document body
  // never scroll; internal panels will handle scrolling. This prevents the
  // whole page from moving up and showing empty space below when the user
  // scrolls inside the editor.
  <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
      <EditorHeader />
      <EditorStoreSync />
      
      {/* Mobile Header */}
      {isMobile && (
        <div className="h-14 bg-background border-b border-border flex items-center justify-between px-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLeftPanelOpen(true)}
            className="h-9 w-9"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRightPanelOpen(true)}
            className="h-9 w-9"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
  <div className="container mx-auto px-4 sm:px-5 lg:px-6 flex-1 flex overflow-hidden pb-14">
          {/* Left Panel - Desktop */}
          {!isMobile && <EditorLeftPanel />}

          {/* Left Panel - Mobile Sheet */}
          {isMobile && (
            <Sheet open={leftPanelOpen} onOpenChange={setLeftPanelOpen}>
              <SheetContent side="left" className="w-[320px] p-0 sm:max-w-[320px]">
                <EditorLeftPanel />
              </SheetContent>
            </Sheet>
          )}

          {/* Center Canvas */}
          <div className="flex-1 flex flex-col overflow-hidden bg-background">
            <EditorContent>
              <EditorCanvas />
            </EditorContent>
          </div>

          {/* Right Panel - Desktop */}
          {!isMobile && <EditorRightPanel />}

          {/* Right Panel - Mobile Sheet */}
          {isMobile && (
            <Sheet open={rightPanelOpen} onOpenChange={setRightPanelOpen}>
              <SheetContent side="right" className="w-[320px] p-0 sm:max-w-[320px]">
                <EditorRightPanel />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
      
  {/* Bottom Bar is rendered at the page level to avoid being contained by transformed ancestors */}
    </div>
  );
}

export function EditorLayout() {
  return (
    <SidebarProvider>
      <EditorMain />
    </SidebarProvider>
  );
}
