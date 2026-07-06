import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';

export function DrawerExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px',
        }}>
          Drawer
        </h3>
        <Drawer>
          <DrawerTrigger>
            <Button variant="primary">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Review changes</DrawerTitle>
              <DrawerDescription>Confirm your settings before saving.</DrawerDescription>
            </DrawerHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{
                color: 'var(--ld-semantic-color-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.5',
              }}>
                Drawers slide up from the bottom of the screen and keep the user in context.
              </p>
              <p style={{
                color: 'var(--ld-semantic-color-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.5',
              }}>
                Use them for short, focused tasks or confirmations.
              </p>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="secondary">Cancel</Button>
              </DrawerClose>
              <DrawerClose>
                <Button variant="primary">Confirm</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>
    </div>
  );
}
