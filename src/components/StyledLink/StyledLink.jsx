import * as React from 'react';
import Link from 'next/link';
import { grey } from '@mui/material/colors';
import { useThemeContext } from '../ThemeContextProvider/ThemeContextProvider';

export function StyledLink({
  href, styles, openInNewTab = false, children,
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { mode } = useThemeContext();

  const colorByTheme = React.useMemo(() => (mode === 'light' ? grey[700] : '#fff'), [mode]);
  const hoveredColorByTheme = React.useMemo(() => (mode === 'light' ? '#000' : grey[500]), [mode]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
        <Link
            href={href}
            target={openInNewTab ? '_blank' : '_self'}
            style={{
              color: isHovered ? hoveredColorByTheme : colorByTheme,
              textDecoration: isHovered ? 'underline' : 'none',
              width: 'auto',
              ...styles,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </Link>
  );
}
