import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const languages: { code: string; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Swahili' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ur', name: 'Urdu' },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleNavigation = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Timeout to ensure navigation
  };

  return (
    <nav className={`flex justify-between items-center p-1.5 lg:p-2 mx-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white'} shadow-lg transition-all duration-300`}>
      <div className="flex items-center">
        {/* KeBest Logo */}
        <div className={`flex items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white'} p-1 rounded-full shadow-lg`}>
          <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full flex items-center justify-center shadow-lg`}>
            <span className={`${isDarkMode ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600'} font-extrabold text-2xl`}>K</span>
          </div>
          <span className="text-lg font-bold ml-2">KeBest</span>
        </div>
      </div>

      <ul className="flex space-x-1 lg:space-x-2 text-sm lg:text-md">
        <li><button onClick={() => handleNavigation('hero')} className="hover:bg-blue-700 hover:text-orange-500 px-2 py-1 rounded transition-colors duration-300">{t('search')}</button></li>
        <li><button onClick={() => handleNavigation('carlist')} className="hover:bg-blue-700 hover:text-orange-500 px-2 py-1 rounded transition-colors duration-300">{t('deals')}</button></li>
        <li><button onClick={() => handleNavigation('tips')} className="hover:bg-blue-700 hover:text-orange-500 px-2 py-1 rounded transition-colors duration-300">{t('tips')}</button></li>
        <li><button onClick={() => handleNavigation('faqs')} className="hover:bg-blue-700 hover:text-orange-500 px-2 py-1 rounded transition-colors duration-300">{t('faqs')}</button></li>
        <li><button onClick={() => handleNavigation('location')} className="hover:bg-blue-700 hover:text-orange-500 px-2 py-1 rounded transition-colors duration-300">{t('location')}</button></li>
        <li><button onClick={() => handleNavigation('reviews')} className="hover:bg-blue-700 hover:text-orange-500 px-2 py-1 rounded transition-colors duration-300">{t('reviews')}</button></li>
        <li><button onClick={() => handleNavigation('stats')} className="hover:bg-blue-700 hover:text-orange-500 px-2 py-1 rounded transition-colors duration-300">{t('companyStatistics')}</button></li>
        <li><button onClick={() => navigate('/login')} className="hover:bg-blue-700 hover:text-orange-500 px-2 py-1 rounded transition-colors duration-300">{t('loginRegister')}</button></li>
      </ul>

      <div className="flex items-center space-x-2 lg:space-x-3 relative">
        <button
          className="bg-yellow-500 text-gray-900 px-2 py-1 rounded-full shadow-lg hover:bg-yellow-400 transition-colors duration-300"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {t('chooseLanguage')}
        </button>
        {isDropdownOpen && (
          <ul className="absolute top-full right-0 mt-2 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden z-50">
            {languages.map((language) => (
              <li
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className="px-3 py-1 cursor-pointer hover:bg-yellow-500 hover:text-white transition-colors duration-300"
              >
                {language.name}
              </li>
            ))}
          </ul>
        )}
        <button
          className="bg-yellow-500 text-gray-900 p-2 rounded-full shadow-lg hover:bg-yellow-400 transition-colors duration-300"
          onClick={toggleDarkMode}
          aria-label={t('toggleMode')}
        >
          {isDarkMode ? <FaSun className="text-gray-900 w-5 h-5" /> : <FaMoon className="text-gray-900 w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
