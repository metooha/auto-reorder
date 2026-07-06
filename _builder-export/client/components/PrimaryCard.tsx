import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Heading } from '@/components/ui/Heading';
import { List, ListItem } from '@/components/ui/List';
import { TrailingBadge } from '@/components/ui/TrailingBadge';

export function PrimaryCard() {
  const { t } = useTranslation();

  return (
    <Card size="large">
      <CardHeader
        title={t('shared.primarySection')}
        trailing={
          <Button variant="secondary" size="small">
            {t('shared.buttonLabel')}
          </Button>
        }
      />
      <CardContent>
        {/* Secondary section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <Heading as="h3" size="small" weight="default">
            {t('shared.secondarySection')}
          </Heading>
          <LinkButton size="medium">{t('shared.linkButton')}</LinkButton>
        </div>

        {/* Tertiary section */}
        <Heading as="h4" size="small" weight="default" UNSAFE_style={{ fontSize: 16, marginBottom: 4 }}>
          {t('shared.tertiarySection')}
        </Heading>

        {/* List items */}
        <List>
          {Array.from({ length: 8 }).map((_, i) => (
            <ListItem
              key={i}
              title={t('shared.listItemText')}
              showTitle={false}
              text={t('shared.listItemText')}
              trailing="custom"
              trailingContent={<TrailingBadge label={t('shared.trailing')} />}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
