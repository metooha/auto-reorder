import { useState } from 'react';
import { Search } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { CartIcon } from '@/components/icons-custom';
import { useNavigate } from 'react-router-dom';
import styles from './MobileHeader.module.css';

export function MobileHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/walmart/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={styles.header}>
      {/* Top row: logo + cart */}
      <div className={styles.topRow}>
        <a
          href="/walmart"
          onClick={(e) => { e.preventDefault(); navigate('/walmart'); }}
          className={styles.logo}
          aria-label="Walmart Homepage"
        >
          <img
            src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
            alt="Walmart"
            width="32"
            height="32"
          />
        </a>

        <IconButton
          aria-label="Cart"
          variant="ghost"
          size="medium"
          UNSAFE_className={styles.cartButton}
          onClick={() => navigate('/walmart/cart')}
        >
          <CartIcon />
        </IconButton>
      </div>

      {/* Search row */}
      <form className={styles.searchRow} onSubmit={handleSearchSubmit} role="search">
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} width={18} height={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search everything at Walmart online and in store"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Walmart"
          />
        </div>
      </form>
    </header>
  );
}
