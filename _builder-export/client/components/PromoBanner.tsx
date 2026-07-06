export function PromoBanner() {
  return (
    <div className="hidden lg:block relative">
      <a
        href="https://www.walmart.com/shop/savings"
        title="Rollbacks and more. See a red zip up jacket, waffle maker, and Tide laundry detergent."
        aria-label="Shop now - Rollbacks and more"
        className="absolute inset-0 z-10"
        style={{
          top: '3px',
          right: '3px',
          bottom: '3px',
          left: '3px'
        }}
      >
        <span className="sr-only">Shop now</span>
      </a>
    </div>
  );
}
