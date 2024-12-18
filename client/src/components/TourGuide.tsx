import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useTranslation } from 'react-i18next';

export function TourGuide() {
  const { t } = useTranslation();
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    // Check if user has already seen the tour
    const tourSeen = localStorage.getItem('tourCompleted');
    if (tourSeen) {
      setHasSeenTour(true);
      return;
    }

    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#logo',
          popover: {
            title: t('tour.welcome'),
            description: t('tour.welcomeDesc'),
            side: 'bottom',
            align: 'start',
          }
        },
        {
          element: '#services',
          popover: {
            title: t('tour.services'),
            description: t('tour.servicesDesc'),
            side: 'bottom',
          }
        },
        {
          element: '#language-switcher',
          popover: {
            title: t('tour.language'),
            description: t('tour.languageDesc'),
            side: 'bottom',
          }
        },
        {
          element: '#login-button',
          popover: {
            title: t('tour.login'),
            description: t('tour.loginDesc'),
            side: 'bottom',
          }
        }
      ],
      onReset: () => {
        localStorage.setItem('tourCompleted', 'true');
        setHasSeenTour(true);
      },
    });

    // Start the tour after a short delay to ensure elements are loaded
    const timer = setTimeout(() => {
      driverObj.drive();
    }, 1000);

    return () => clearTimeout(timer);
  }, [t]);

  return null;
}
