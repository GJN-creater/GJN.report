/**
 * 조건부 Tailwind 클래스 결합 유틸
 * 사용 예시:
 * cn("btn", isActive && "btn-primary", isDisabled && "opacity-50")
 */

export function cn(...inputs: Array<string | undefined | null | false | 0 | Record<string, boolean>>): string {
  return inputs
    .map((input) => {
      if (typeof input === "string" || typeof input === "number") {
        return input;
      }

      if (typeof input === "object" && input !== null) {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }

      return "";
    })
    .filter(Boolean)
    .join(" ");
}
