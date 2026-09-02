// Bilingual dictionary (English / Sinhala) for the storefront UI.
// Product names come from the API (English `title` + `sinhalaName`).

export const dictionary = {
  en: {
    searchPlaceholder: 'Search for groceries, essentials and more...',
    switchTo: 'සිංහල', // label on the toggle: switches TO Sinhala
    account: 'Account',
    cart: 'Cart',

    categories: {
      'pantry-staples': 'Pantry Staples',
      'snacks-sweets': 'Snacks & Sweets',
      beverages: 'Beverages',
      household: 'Household',
      'personal-care': 'Personal Care',
      'dairy-products': 'Dairy Products',
      'baby-care': 'Baby Care',
      'pet-supplies': 'Pet Supplies',
    },

    hero: [
      {
        badge: 'Mega Sale',
        title: 'Everyday Groceries at Unbeatable Prices',
        description: 'Save big on your favourite brands — pantry staples, dairy, snacks and more.',
        button: 'Shop Now',
      },
      {
        badge: 'Weekend Special',
        title: 'All Your Household Essentials in One Place',
        description: 'From Anchor to Sunlight — trusted brands delivered fast to your door.',
        button: 'Order Now',
      },
    ],

    sections: {
      hotDeals: 'Hot Deals & Discounts',
      dailyEssentials: 'Daily Essentials',
      shopByCategory: 'Shop by Category',
    },

    viewAll: 'View All',
    add: 'Add',
    perUnit: '/ Unit',
    off: 'OFF',
    home: 'Home',
    itemOne: 'item',
    itemMany: 'items',
    emptyCategory: 'No products available in this category yet.',

    // Product detail
    detail: {
      inStock: 'In stock',
      outOfStock: 'Out of stock',
      quantity: 'Quantity',
      addToCart: 'Add to Cart',
      added: 'Added to cart',
      buyNow: 'Buy Now',
      youSave: 'You save',
      related: 'You might also like',
      backToShop: 'Back to shopping',
      description:
        'Fresh and quality-checked, delivered to your door. Prices update live from our store.',
    },

    // Cart
    cartPage: {
      title: 'Your Cart',
      empty: 'Your cart is empty.',
      startShopping: 'Start shopping',
      continueShopping: 'Continue Shopping',
      item: 'Item',
      price: 'Price',
      qty: 'Qty',
      total: 'Total',
      remove: 'Remove',
      subtotal: 'Subtotal',
      delivery: 'Delivery',
      free: 'Free',
      grandTotal: 'Total',
      checkout: 'Proceed to Checkout',
      clear: 'Clear cart',
    },

    // Checkout
    checkout: {
      title: 'Checkout',
      deliveryDetails: 'Delivery Details',
      name: 'Full name',
      phone: 'Phone number',
      address: 'Delivery address',
      note: 'Order note (optional)',
      orderSummary: 'Order Summary',
      placeOrder: 'Place Order',
      placing: 'Placing order…',
      loginRequired: 'Please sign in to place your order.',
      signIn: 'Sign In',
      emptyCart: 'Your cart is empty.',
      successTitle: 'Order placed!',
      successBody:
        'Thanks for your order. We will confirm it shortly. You can track it under your account.',
      viewOrders: 'View my orders',
      backHome: 'Back to home',
      payNote: 'Pay on delivery. Your order stays pending until we confirm it.',
    },

    // Account / auth
    account: {
      title: 'My Account',
      signIn: 'Sign In',
      register: 'Create Account',
      email: 'Email',
      password: 'Password',
      name: 'Full name',
      phone: 'Phone (optional)',
      address: 'Address (optional)',
      signInCta: 'Sign In',
      registerCta: 'Create Account',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      signOut: 'Sign Out',
      profile: 'Profile',
      myOrders: 'My Orders',
      noOrders: 'You have no orders yet.',
      orderNo: 'Order',
      status: 'Status',
      placedOn: 'Placed on',
      working: 'Please wait…',
      saveProfile: 'Save changes',
      saved: 'Saved.',
    },

    footer: {
      description:
        'Your trusted online grocery store. Bringing the freshest produce, daily essentials, and exclusive discounts right to your doorstep.',
      quickLinks: 'Quick Links',
      aboutUs: 'About Us',
      shopCategories: 'Shop Categories',
      latestOffers: 'Latest Offers',
      faq: 'FAQ',
      contactUs: 'Contact Us',
      customerService: 'Customer Service',
      trackOrder: 'Track Order',
      returns: 'Returns & Refunds',
      shipping: 'Shipping Policy',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      contact: 'Contact',
      rights: 'All rights reserved.',
      privacy: 'Privacy',
      termsShort: 'Terms',
    },
  },

  si: {
    searchPlaceholder: 'සිල්ලර භාණ්ඩ, අත්‍යවශ්‍ය දේ සහ තවත් දේ සොයන්න...',
    switchTo: 'English', // label on the toggle: switches TO English
    account: 'ගිණුම',
    cart: 'කරත්තය',

    categories: {
      'pantry-staples': 'අත්‍යවශ්‍ය ද්‍රව්‍ය',
      'snacks-sweets': 'කෙටි කෑම සහ රසකැවිලි',
      beverages: 'බීම වර්ග',
      household: 'ගෘහ භාණ්ඩ',
      'personal-care': 'පුද්ගලික සත්කාර',
      'dairy-products': 'කිරි නිෂ්පාදන',
      'baby-care': 'ළදරු සත්කාර',
      'pet-supplies': 'සුරතල් සතුන්ට',
    },

    hero: [
      {
        badge: 'මහා විකුණුම',
        title: 'දිනපතා සිල්ලර භාණ්ඩ අඩුම මිලට',
        description: 'ඔබේ ප්‍රියතම වෙළඳ නාම අඩු මිලට — අත්‍යවශ්‍ය ද්‍රව්‍ය, කිරි, කෙටි කෑම සහ තවත් දේ.',
        button: 'දැන් සාප්පු යන්න',
      },
      {
        badge: 'සති අන්ත විශේෂය',
        title: 'ඔබේ සියලු ගෘහ අත්‍යවශ්‍ය දේ එකම තැනකින්',
        description: 'Anchor සිට Sunlight දක්වා — විශ්වාසනීය වෙළඳ නාම ඔබේ දොරකඩටම ඉක්මනින්.',
        button: 'දැන් ඇණවුම් කරන්න',
      },
    ],

    sections: {
      hotDeals: 'උණුසුම් ඩීල් සහ වට්ටම්',
      dailyEssentials: 'දෛනික අත්‍යවශ්‍ය දේ',
      shopByCategory: 'වර්ග අනුව සාප්පු යන්න',
    },

    viewAll: 'සියල්ල බලන්න',
    add: 'එකතු කරන්න',
    perUnit: '/ ඒකකය',
    off: 'වට්ටම්',
    home: 'මුල් පිටුව',
    itemOne: 'අයිතමය',
    itemMany: 'අයිතම',
    emptyCategory: 'මෙම වර්ගයේ භාණ්ඩ තවම නොමැත.',

    // Product detail
    detail: {
      inStock: 'තොගයේ ඇත',
      outOfStock: 'තොගයේ නැත',
      quantity: 'ප්‍රමාණය',
      addToCart: 'කරත්තයට එක් කරන්න',
      added: 'කරත්තයට එක් කළා',
      buyNow: 'දැන් මිලදී ගන්න',
      youSave: 'ඔබ ඉතිරි කරයි',
      related: 'ඔබට මේවාත් කැමති විය හැක',
      backToShop: 'නැවත සාප්පුවට',
      description:
        'නැවුම්, ගුණාත්මක පරීක්ෂා කළ භාණ්ඩ ඔබේ දොරකඩටම. මිල ගණන් අපගේ වෙළඳසැලෙන් සජීවීව යාවත්කාලීන වේ.',
    },

    // Cart
    cartPage: {
      title: 'ඔබේ කරත්තය',
      empty: 'ඔබේ කරත්තය හිස්ය.',
      startShopping: 'සාප්පු යාම ආරම්භ කරන්න',
      continueShopping: 'සාප්පු යාම දිගටම',
      item: 'භාණ්ඩය',
      price: 'මිල',
      qty: 'ගණන',
      total: 'එකතුව',
      remove: 'ඉවත් කරන්න',
      subtotal: 'උප එකතුව',
      delivery: 'බෙදාහැරීම',
      free: 'නොමිලේ',
      grandTotal: 'එකතුව',
      checkout: 'ගෙවීමට යන්න',
      clear: 'කරත්තය හිස් කරන්න',
    },

    // Checkout
    checkout: {
      title: 'ගෙවීම',
      deliveryDetails: 'බෙදාහැරීමේ විස්තර',
      name: 'සම්පූර්ණ නම',
      phone: 'දුරකථන අංකය',
      address: 'බෙදාහැරීමේ ලිපිනය',
      note: 'ඇණවුම් සටහන (විකල්ප)',
      orderSummary: 'ඇණවුම් සාරාංශය',
      placeOrder: 'ඇණවුම තබන්න',
      placing: 'ඇණවුම තබමින්…',
      loginRequired: 'ඇණවුම තැබීමට කරුණාකර පිවිසෙන්න.',
      signIn: 'පිවිසෙන්න',
      emptyCart: 'ඔබේ කරත්තය හිස්ය.',
      successTitle: 'ඇණවුම තැබුවා!',
      successBody:
        'ඔබේ ඇණවුමට ස්තුතියි. අපි එය ඉක්මනින් තහවුරු කරන්නෙමු. ඔබට එය ඔබේ ගිණුමෙන් නිරීක්ෂණය කළ හැක.',
      viewOrders: 'මගේ ඇණවුම් බලන්න',
      backHome: 'මුල් පිටුවට',
      payNote: 'බෙදාහැරීමේදී ගෙවන්න. අප තහවුරු කරන තෙක් ඔබේ ඇණවුම පොරොත්තුවේ පවතී.',
    },

    // Account / auth
    account: {
      title: 'මගේ ගිණුම',
      signIn: 'පිවිසෙන්න',
      register: 'ගිණුමක් සාදන්න',
      email: 'විද්‍යුත් තැපෑල',
      password: 'මුරපදය',
      name: 'සම්පූර්ණ නම',
      phone: 'දුරකථනය (විකල්ප)',
      address: 'ලිපිනය (විකල්ප)',
      signInCta: 'පිවිසෙන්න',
      registerCta: 'ගිණුමක් සාදන්න',
      noAccount: 'ගිණුමක් නැද්ද?',
      haveAccount: 'දැනටමත් ගිණුමක් තිබේද?',
      signOut: 'පිටවෙන්න',
      profile: 'පැතිකඩ',
      myOrders: 'මගේ ඇණවුම්',
      noOrders: 'ඔබට තවම ඇණවුම් නැත.',
      orderNo: 'ඇණවුම',
      status: 'තත්ත්වය',
      placedOn: 'තැබූ දිනය',
      working: 'කරුණාකර රැඳී සිටින්න…',
      saveProfile: 'වෙනස්කම් සුරකින්න',
      saved: 'සුරකින ලදී.',
    },

    footer: {
      description:
        'ඔබේ විශ්වාසනීය සිල්ලර වෙළඳසැල. නැවුම් නිෂ්පාදන, දෛනික අත්‍යවශ්‍ය දේ සහ විශේෂ වට්ටම් ඔබේ දොරකඩටම.',
      quickLinks: 'ඉක්මන් සබැඳි',
      aboutUs: 'අප ගැන',
      shopCategories: 'භාණ්ඩ වර්ග',
      latestOffers: 'නවතම දීමනා',
      faq: 'නිතර අසන පැන',
      contactUs: 'අප අමතන්න',
      customerService: 'පාරිභෝගික සේවාව',
      trackOrder: 'ඇණවුම නිරීක්ෂණය',
      returns: 'ආපසු භාරදීම් සහ මුදල් ආපසු',
      shipping: 'බෙදාහැරීමේ ප්‍රතිපත්තිය',
      privacyPolicy: 'රහස්‍යතා ප්‍රතිපත්තිය',
      terms: 'නියම සහ කොන්දේසි',
      contact: 'සම්බන්ධ වන්න',
      rights: 'සියලු හිමිකම් ඇවිරිණි.',
      privacy: 'රහස්‍යතාව',
      termsShort: 'නියම',
    },
  },
};
