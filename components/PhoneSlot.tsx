/**
 * 앱 스크린샷이 들어갈 자리. 실제 앱 화면 이미지가 확정되면
 * children 대신 <Image>를 넣어 교체한다.
 */
export function PhoneSlot({
  className = "",
  frameClassName = "",
  label = "앱 화면 이미지 자리",
  children,
}: {
  className?: string;
  frameClassName?: string;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative aspect-[9/19] w-full max-w-[290px] ${className}`}>
      <div
        className={`absolute inset-0 rounded-[2.6rem] border p-2.5 ${frameClassName}`}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] bg-current/5">
          {children ?? (
            <span className="px-6 text-center text-xs leading-relaxed opacity-45">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
