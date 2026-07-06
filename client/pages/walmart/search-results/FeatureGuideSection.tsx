import { useState } from 'react';
import { useDragScroll } from '@/hooks/useDragScroll';
import { Chip } from "@/components/ui/Chip";
import styles from "./FeatureGuideSection.module.css";


const FEATURE_FILTERS = ['Display type', 'Resolution', 'Size', 'Refresh rate', 'HDR', 'Internet services'] as const;

interface FeatureContent {
  title: string;
  image?: string;
  badges?: string[];
  paragraphs: Array<{ bold?: string; text: string }>;
}

const FEATURE_CONTENT: Record<string, FeatureContent> = {
  'Display type': {
    title: 'TV display type',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/d143992c6d26f11fd6b8d8dccd4f3ae258a98c50?width=443',
    badges: ['LED', 'OLED', 'QLED'],
    paragraphs: [
      { bold: 'LED', text: ' is energy-efficient and offer good brightness' },
      { bold: 'OLED', text: ' has superior picture quality with deep blacks, high contrast, and vibrant colors' },
      { bold: 'QLED', text: ' has excellent brightness and color volume, making them suitable for brightly lit rooms' },
    ],
  },
  'Resolution': {
    title: 'Resolution',
    paragraphs: [
      { text: 'TV resolution depends on factors such as screen size, viewing distance, content availability, and budget' },
      { text: 'Higher resolutions like 4K and 8K offer superior image quality but are more costly and require compatible content.' },
    ],
  },
  'Size': {
    title: 'Size',
    paragraphs: [
      { text: 'The size of TV is measured diagonally from one corner of the screen to the opposite corner' },
      { text: 'Larger TVs require a greater viewing distance to avoid eye strain' },
    ],
  },
  'Refresh rate': {
    title: 'Refresh rate',
    paragraphs: [
      { text: 'Refresh rate is measured in hertz (Hz) and indicates how many times per second the screen updates.' },
      { bold: '60Hz', text: ' is standard for most content and suitable for general viewing' },
      { bold: '120Hz', text: ' provides smoother motion, ideal for sports and gaming' },
    ],
  },
  'HDR': {
    title: 'HDR',
    paragraphs: [
      { text: 'High Dynamic Range (HDR) enhances the contrast and color range of your TV display' },
      { bold: 'HDR10', text: ' is the most common standard, supported by most TVs and streaming services' },
      { bold: 'Dolby Vision', text: ' offers dynamic metadata for scene-by-scene optimization' },
    ],
  },
  'Internet services': {
    title: 'Internet services',
    paragraphs: [
      { text: 'Smart TVs come with built-in streaming platforms and apps for easy access to content' },
      { bold: 'Popular platforms:', text: ' Roku, Fire TV, Google TV, webOS, Tizen' },
    ],
  },
};

function FeatureCard({ filter }: { filter: string }) {
  const content = FEATURE_CONTENT[filter];
  if (!content) return null;

  return (
    <>
      <h3 className={styles.featureCardTitle}>{content.title}</h3>
      <div className={styles.featureCardInner}>
        {content.image && (
          <div className="relative">
            <img src={content.image} alt={content.title} className="w-full h-[119px] object-cover rounded-t-lg" />
            {content.badges && (
              <div className={styles.badgesRow}>
                {content.badges.map((badge) => (
                  <div key={badge} className={styles.badgePill}>
                    <span className={styles.featureBadgeLabel}>{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className={styles.paragraphsArea}>
          {content.paragraphs.map((p, i) => (
            <p key={i} className={styles.featureBodyText}>
              {p.bold && <span style={{ fontWeight: 700 }}>{p.bold}</span>}
              {p.text}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export function FeatureGuideSection() {
  const [selectedFilter, setSelectedFilter] = useState('Display type');
  const featureFiltersScrollRef = useDragScroll();
  const displayCarouselScrollRef = useDragScroll();

  return (
    <div className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>Features to consider when shopping for TVs</h2>
        <div ref={featureFiltersScrollRef} className={styles.chipRow}>
          {FEATURE_FILTERS.map((filter) => (
            <Chip
              key={filter}
              size="small"
              selected={selectedFilter === filter}
              onSelectedChange={() => setSelectedFilter(filter)}
            >
              {filter}
            </Chip>
          ))}
        </div>
      </div>

      <div ref={displayCarouselScrollRef} className={styles.carousel}>
        <div className={styles.featureCard} style={{ width: '300px' }}>
          <FeatureCard filter={selectedFilter} />
        </div>
      </div>
    </div>
  );
}
