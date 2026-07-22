export function PageContainer({
  title,
  description,
  action,
  children,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-[800px]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-[26px] leading-[35px]">{title}</h1>
          {description && (
            <p className="mt-[9px] text-[14px] text-muted-foreground leading-[21px]">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}
