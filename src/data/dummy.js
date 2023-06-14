import { MdAnalytics, MdCalendarMonth, MdDashboard, MdInventory, MdMessage,  MdNotes, MdOutlineNotifications } from "react-icons/md";

export const links = [
    {
        name:"Dashboard",
        link:"/dashboard",
        icon:<MdDashboard/>
    },
    {
        name:"Analytics",
        link:"/analytics",
        icon:<MdAnalytics/>
    },
    {
        name:"Invoice",
        link:"/invoice",
        icon:<MdInventory/>
    },
    {
        name:"Schedule",
        link:"/schedule",
        icon:<MdNotes/>
    },
    {
        name:"Calendar",
        link:"/calendar",
        icon:<MdCalendarMonth/>
    },
    {
        name:"Messages",
        link:"/messages",
        icon:<MdMessage/>
    },
    {
        name:"Notifications",
        link:"/notification",
        icon:<MdOutlineNotifications/>
    },
]

export const dashCard =[
    {
        icon: "",
        amount: '178+',
        percentage: '-4%',
        title: 'Favorites',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
      },
      {
        icon: "",
        amount: '20+',
        percentage: '+23%',
        title: 'New Sales',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
      },
      {
        icon: "",
        amount: '190+',
        percentage: '+38%',
        title: 'New Leads',
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',
    
        pcColor: 'green-600',
      },
      {
        icon: "",
        amount: '12+',
        percentage: '-12%',
        title: 'Referrals',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
      },
]

export const themeColors = [
    {
      name: 'blue-theme',
      color: '#1A97F5',
    },
    {
      name: 'green-theme',
      color: '#03C9D7',
    },
    {
      name: 'purple-theme',
      color: '#7352FF',
    },
    {
      name: 'red-theme',
      color: '#FF5C8E',
    },
    {
      name: 'indigo-theme',
      color: '#1E4DB7',
    },
    {
      color: '#FB9678',
      name: 'orange-theme',
    },
  ];