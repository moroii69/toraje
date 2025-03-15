import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Clock, ArrowLeft, RefreshCw, Bell, ExternalLink } from 'lucide-react';

const StatusPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for system status
  const [systems, setSystems] = useState([
    {
      name: 'File Upload Service',
      status: 'operational',
      latency: '67ms',
      uptime: '99.98%',
      lastIncident: null
    },
    {
      name: 'File Storage System',
      status: 'operational',
      latency: '32ms',
      uptime: '99.99%',
      lastIncident: null
    },
    {
      name: 'Authentication API',
      status: 'operational',
      latency: '45ms',
      uptime: '99.95%',
      lastIncident: null
    },
    {
      name: 'File Sharing Interface',
      status: 'degraded',
      latency: '230ms',
      uptime: '99.82%',
      lastIncident: 'March 12, 2025'
    },
    {
      name: 'CDN Distribution',
      status: 'operational',
      latency: '24ms',
      uptime: '100.0%',
      lastIncident: null
    },
    {
      name: 'Database Cluster',
      status: 'operational',
      latency: '38ms',
      uptime: '99.97%',
      lastIncident: 'March 5, 2025'
    }
  ]);

  // Mock data for incidents
  const [incidents, setIncidents] = useState([
    {
      id: 'inc-001',
      title: 'File sharing interface degraded performance',
      status: 'investigating',
      date: 'March 15, 2025 - 09:43 UTC',
      updates: [
        { time: '09:43 UTC', message: 'We are investigating reports of slow response times on the file sharing interface.' },
        { time: '09:52 UTC', message: 'We have identified the issue with our load balancer configuration. Working on a fix.' }
      ]
    },
    {
      id: 'inc-002',
      title: 'Database cluster intermittent connectivity',
      status: 'resolved',
      date: 'March 5, 2025 - 14:22 UTC',
      resolvedAt: 'March 5, 2025 - 15:11 UTC',
      updates: [
        { time: '14:22 UTC', message: 'We are investigating intermittent connectivity issues with our database cluster.' },
        { time: '14:38 UTC', message: 'We have identified the issue with one of our database nodes. Failover in progress.' },
        { time: '15:11 UTC', message: 'The issue has been resolved. All systems are now operational.' }
      ]
    }
  ]);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });

  const refreshStatus = () => {
    setIsRefreshing(true);
    // Simulate refresh with slight delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      toast.success('Subscribed to status updates!');
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'degraded':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'outage':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded';
      case 'outage':
        return 'Outage';
      case 'investigating':
        return 'Investigating';
      case 'resolved':
        return 'Resolved';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'operational':
      case 'resolved':
        return 'text-emerald-400';
      case 'degraded':
      case 'investigating':
        return 'text-amber-400';
      case 'outage':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  // Calculate overall status
  const getOverallStatus = () => {
    if (systems.some(sys => sys.status === 'outage')) {
      return 'outage';
    } else if (systems.some(sys => sys.status === 'degraded')) {
      return 'degraded';
    } else {
      return 'operational';
    }
  };

  const overallStatus = getOverallStatus();

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? 'bg-black' : 'bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-800'}`}
      style={{
        transition: 'background 0.5s ease',
        backgroundImage: darkMode ?
          `linear-gradient(rgba(30, 30, 30, 0.1) 1px, transparent 1px),
           linear-gradient(90deg, rgba(30, 30, 30, 0.1) 1px, transparent 1px)` :
          `linear-gradient(rgba(200, 200, 200, 0.1) 1px, transparent 1px),
           linear-gradient(90deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    >
      {/* Header with time */}
      <div className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-800 bg-opacity-70 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <a href="/contact" className="flex items-center gap-1 text-gray-400 hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </a>
          <div className="h-4 border-r border-gray-700"></div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-mono">{formattedTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refreshStatus}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-300"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={toggleSubscribe}
            className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${isSubscribed ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-300'}`}
          >
            <Bell className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className="flex-1 container mx-auto max-w-4xl px-4 py-6">
        {/* Status header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            {getStatusIcon(overallStatus)}
            <h1 className="text-xl font-medium">System Status</h1>
          </div>
          <p className={`text-sm ${getStatusColor(overallStatus)}`}>
            {overallStatus === 'operational' ? 'All systems operational' : 'Some systems experiencing issues'}
          </p>
          <p className="text-xs text-gray-500 mt-1">Last updated: {formattedDate} at {formattedTime}</p>
        </div>

        {/* Status cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {systems.map((system, index) => (
            <div key={index} className={`p-4 rounded-md border ${darkMode ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-gray-200'} backdrop-blur-sm`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{system.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getStatusIcon(system.status)}
                    <span className={`text-xs ${getStatusColor(system.status)}`}>
                      {getStatusText(system.status)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Latency</p>
                  <p className="text-sm font-mono">{system.latency}</p>
                </div>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-800/50 text-xs text-gray-500">
                <span>Uptime: {system.uptime}</span>
                {system.lastIncident && <span>Last incident: {system.lastIncident}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Incidents */}
        <h2 className="text-lg font-medium mb-4">Incidents</h2>
        <div className="space-y-4">
          {incidents.map((incident, index) => (
            <div key={index} className={`p-4 rounded-md border ${darkMode ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-gray-200'} backdrop-blur-sm`}>
              <div className="flex items-center gap-2 mb-3">
                {getStatusIcon(incident.status)}
                <h3 className="font-medium text-sm">{incident.title}</h3>
                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${getStatusColor(incident.status)} bg-opacity-10 ${incident.status === 'resolved' ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                  {getStatusText(incident.status)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{incident.date}</p>

              <div className="space-y-3 pl-4 border-l border-gray-800/50">
                {incident.updates.map((update, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-gray-700"></div>
                    <p className="text-xs font-mono text-gray-500">{update.time}</p>
                    <p className="text-xs mt-1">{update.message}</p>
                  </div>
                ))}
              </div>

              {incident.resolvedAt && (
                <p className="text-xs text-emerald-400 mt-3">
                  ✓ Resolved at {incident.resolvedAt}
                </p>
              )}
            </div>
          ))}

          {incidents.length === 0 && (
            <div className="text-center p-8">
              <p className="text-gray-500">No incidents reported in the last 30 days.</p>
            </div>
          )}
        </div>

        {/* Historical uptime */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Historical Uptime</h2>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Operational
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Degraded
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                Outage
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-md border ${darkMode ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-gray-200'} backdrop-blur-sm`}>
            <div className="grid grid-cols-30 gap-1 h-12">
              {/* Mock uptime indicators - 30 days */}
              {Array(30).fill(0).map((_, i) => {
                // Generate random status with bias towards operational
                const rand = Math.random() * 100;
                let status = rand < 90 ? 'operational' : rand < 98 ? 'degraded' : 'outage';

                // Make sure March 5 and 15 match our incidents
                if (i === 29 - 10) status = 'degraded'; // March 5
                if (i === 29 - 0) status = 'degraded';  // Today (March 15)

                const bgColor = status === 'operational' ? 'bg-emerald-400' :
                               status === 'degraded' ? 'bg-amber-400' : 'bg-red-400';

                               return (
                                <div key={i} className="relative">
                                  <div className={`h-full w-full rounded-sm ${bgColor} group`}>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                                      March {15 - i}, 2025
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>30 days ago</span>
                            <span>Today</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-12 pt-6 border-t border-gray-800/50 flex justify-between items-center text-xs text-gray-500">
                        <div>
                          <p>© 2025 Ufraan • Toraje File Sharing</p>
                        </div>
                        <div className="flex gap-4">
                          <a href="/contact" className="hover:text-gray-300 transition-colors">Contact</a>
                          <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</a>
                          <a href="https://twitter.com/ufraan" className="hover:text-gray-300 transition-colors">Twitter</a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              };

              // Add this CSS at the end to define the grid-cols-30 utility
              const styles = `
                .grid-cols-30 {
                  grid-template-columns: repeat(30, minmax(0, 1fr));
                }
              `;

              const styleSheet = document.createElement('style');
              styleSheet.textContent = styles;
              document.head.appendChild(styleSheet);

              export default StatusPage;