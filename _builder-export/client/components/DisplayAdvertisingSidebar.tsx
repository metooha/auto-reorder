import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Megaphone,
  BarGraph,
  Toolbox,
  Image,
  Upload,
  ArrowRightLine,
  ArrowLeftLine,
  ChevronDown,
} from '@/components/icons';

interface DisplayAdvertisingSidebarProps {
  activeMenuItem: string;
  onMenuItemClick: (itemId: string) => void;
}

const iconStyle = { width: 16, height: 16 };

export default function DisplayAdvertisingSidebar({
  activeMenuItem,
  onMenuItemClick,
}: DisplayAdvertisingSidebarProps) {
  const navigate = useNavigate();

  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [sidebarResizeStartX, setSidebarResizeStartX] = useState(0);
  const [sidebarResizeStartWidth, setSidebarResizeStartWidth] = useState(0);
  const [campaignsExpanded, setCampaignsExpanded] = useState(true);

  const sidebarExpanded = sidebarLocked || sidebarHovered;

  const menuItems = [
    { id: 'dashboard', label: 'Home', Icon: Home },
    {
      id: 'campaigns',
      label: 'Notifications',
      Icon: Megaphone,
      submenuItems: [
        { id: 'campaigns-sub1', label: 'Sub page' },
        { id: 'campaigns-sub2', label: 'Sub page' },
        { id: 'campaigns-sub3', label: 'Sub page' },
      ],
    },
    { id: 'reports', label: 'Charts', Icon: BarGraph },
    { id: 'tools', label: 'Tools', Icon: Toolbox },
    { id: 'video-manager', label: 'Media', Icon: Image },
    { id: 'bulk-operations', label: 'Uploads', Icon: Upload },
  ];

  useEffect(() => {
    if (!isResizingSidebar) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - sidebarResizeStartX;
      const newWidth = Math.max(64, Math.min(400, sidebarResizeStartWidth + delta));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar, sidebarResizeStartX, sidebarResizeStartWidth]);

  const handleToggle = () => {
    if (sidebarLocked) {
      setSidebarLocked(false);
    } else {
      setSidebarLocked(true);
      if (sidebarWidth < 220) {
        setSidebarWidth(220);
      }
    }
  };

  const handleCampaignsToggle = () => {
    if (!sidebarExpanded) {
      navigate('/display-advertising/campaigns');
      onMenuItemClick('campaigns');
      return;
    }
    setCampaignsExpanded(!campaignsExpanded);
  };

  return (
    <aside
      style={{
        borderRight: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #FFFFFF)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--ld-semantic-spacing-3, 12px)',
        alignSelf: 'stretch',
        overflow: 'hidden',
        position: 'relative',
        width: sidebarExpanded ? `${sidebarWidth}px` : '64px',
        transition: isResizingSidebar ? 'none' : 'width 300ms ease-in-out',
      }}
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      {/* Menu items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map((item) => {
          const isActive =
            activeMenuItem === item.id ||
            (item.id === 'campaigns' && activeMenuItem.startsWith('campaigns'));
          const IconComponent = item.Icon;
          const hasSubmenu = item.submenuItems && item.submenuItems.length > 0;
          const isSubmenuActive =
            hasSubmenu && item.submenuItems!.some((sub) => activeMenuItem === sub.id);
          const shouldShowAsActive = isActive || isSubmenuActive;
          const isCampaigns = item.id === 'campaigns';

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (isCampaigns) {
                    handleCampaignsToggle();
                    if (sidebarExpanded) return;
                  } else {
                    onMenuItemClick(item.id);
                    if (item.id === 'dashboard') {
                      navigate('/');
                    }
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: sidebarExpanded ? 'center' : 'center',
                  gap: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
                  paddingLeft: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
                  paddingRight: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
                  width: sidebarExpanded ? '100%' : '40px',
                  justifyContent: sidebarExpanded ? 'space-between' : 'center',
                  margin: sidebarExpanded ? undefined : '0 auto',
                  height: '36px',
                  borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
                  backgroundColor:
                    shouldShowAsActive && sidebarExpanded
                      ? 'var(--ld-semantic-color-action-fill-primary-subtle, #E9F1FE)'
                      : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  transition: 'background-color 150ms',
                }}
                onMouseEnter={(e) => {
                  if (!shouldShowAsActive || !sidebarExpanded) {
                    e.currentTarget.style.backgroundColor =
                      'var(--ld-semantic-color-fill-surface-secondary, #F5F5F6)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    shouldShowAsActive && sidebarExpanded
                      ? 'var(--ld-semantic-color-action-fill-primary-subtle, #E9F1FE)'
                      : 'transparent';
                }}
                aria-label={item.label}
                title={!sidebarExpanded ? item.label : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-semantic-spacing-3, 12px)' }}>
                  <IconComponent
                    style={{
                      ...iconStyle,
                      color: shouldShowAsActive
                        ? 'var(--ld-semantic-color-action-fill-primary, #0053E2)'
                        : 'var(--ld-semantic-color-text-primary, #2E2F32)',
                    }}
                  />
                  {sidebarExpanded && (
                    <span
                      style={{
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: shouldShowAsActive
                          ? 'var(--ld-semantic-color-action-fill-primary, #0053E2)'
                          : 'var(--ld-semantic-color-text-primary, #2E2F32)',
                        fontFamily: 'var(--ld-semantic-font-family-sans)',
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
                {sidebarExpanded && isCampaigns && (
                  <div
                    style={{
                      transform: campaignsExpanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 150ms',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                    }}
                  >
                    <ChevronDown style={iconStyle} />
                  </div>
                )}
              </button>

              {/* Submenu items for Campaigns */}
              {isCampaigns && campaignsExpanded && sidebarExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                  {item.submenuItems!.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        navigate('/display-advertising/campaigns');
                        onMenuItemClick(subItem.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--ld-semantic-spacing-3, 12px)',
                        paddingLeft: '48px',
                        paddingRight: 'var(--ld-semantic-spacing-3, 12px)',
                        width: '100%',
                        height: '36px',
                        borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--ld-semantic-font-family-sans)',
                        transition: 'background-color 150ms',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          'var(--ld-semantic-color-fill-surface-secondary, #F5F5F6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      aria-label={subItem.label}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                        }}
                      >
                        ○
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                          fontFamily: 'var(--ld-semantic-font-family-sans)',
                        }}
                      >
                        {subItem.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Toggle button at bottom */}
      <div>
        <button
          onClick={handleToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
            paddingLeft: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
            paddingRight: sidebarExpanded ? 'var(--ld-semantic-spacing-3, 12px)' : undefined,
            width: sidebarExpanded ? '100%' : '40px',
            justifyContent: sidebarExpanded ? undefined : 'center',
            margin: sidebarExpanded ? undefined : '0 auto',
            height: '36px',
            borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            transition: 'background-color 150ms',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              'var(--ld-semantic-color-fill-surface-secondary, #F5F5F6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label={sidebarLocked ? 'Collapse sidebar' : 'Lock sidebar open'}
          aria-expanded={sidebarLocked}
        >
          {sidebarExpanded ? (
            <>
              <ArrowLeftLine style={iconStyle} />
              <span
                style={{
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}
              >
                Lock
              </span>
            </>
          ) : (
            <ArrowRightLine style={iconStyle} />
          )}
        </button>
      </div>

      {/* Resize handle */}
      {sidebarExpanded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '4px',
            height: '100%',
            cursor: 'col-resize',
            backgroundColor: 'transparent',
            transition: 'background-color 150ms',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              'var(--ld-semantic-color-action-fill-primary, #0053E2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizingSidebar(true);
            setSidebarResizeStartX(e.clientX);
            setSidebarResizeStartWidth(sidebarWidth);
          }}
        />
      )}
    </aside>
  );
}
