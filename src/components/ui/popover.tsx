import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverPortal = PopoverPrimitive.Portal;

export const PopoverContent = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>) => (
  <PopoverPortal>
    <PopoverPrimitive.Content
      align="start"
      side="top" // ◀ 가장 큰 평가 사항: 위치로 들려오기
      sideOffset={8}
      collisionPadding={10}
      avoidCollisions={true}
      forceMount 
      style={{
        background: 'white'
      }}
      className={cn(
        "z-[9999] w-[320px] max-h-[300px] overflow-y-auto",
        "rounded-xl border border-gray-300 dark:border-neutral-700",
        "bg-white dark:bg-neutral-800 shadow-xl p-4",
        "transition-all duration-200 ease-in-out",
        "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPortal>
); 