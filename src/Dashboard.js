import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart,
  Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const Dashboard = () => {
  // Data preparation
  const data = [
    { month: 'Apr 24', invited: 35, attended: 18, dna: 17, rescheduled: 0, cancelled: 0, format: 'V' },
    { month: 'May 24', invited: 42, attended: 32, dna: 10, rescheduled: 0, cancelled: 0, format: 'V' },
    { month: 'Jun 24', invited: 17, attended: 10, dna: 7, rescheduled: 0, cancelled: 0, format: 'F2F' },
    { month: 'Jul 24', invited: 32, attended: 20, dna: 12, rescheduled: 0, cancelled: 0, format: 'V' },
    { month: 'Aug 24', invited: 36, attended: 15, dna: 21, rescheduled: 0, cancelled: 0, format: 'V' },
    { month: 'Sep 24', invited: 18, attended: 11, dna: 7, rescheduled: 0, cancelled: 0, format: 'F2F' },
    { month: 'Oct 24', invited: 42, attended: 27, dna: 15, rescheduled: 0, cancelled: 0, format: 'V' },
    { month: 'Nov 24', invited: 23, attended: 10, dna: 7, rescheduled: 4, cancelled: 1, format: 'F2F' },
    { month: 'Dec 24', invited: 74, attended: 34, dna: 16, rescheduled: 21, cancelled: 3, format: 'V' },
    { month: 'Jan 25', invited: 78, attended: 29, dna: 24, rescheduled: 19, cancelled: 6, format: 'V' },
    { month: 'Feb 25', invited: 41, attended: 12, dna: 3, rescheduled: 23, cancelled: 3, format: 'F2F' },
    { month: 'Mar 25', invited: 77, attended: 34, dna: 37, rescheduled: 5, cancelled: 1, format: 'V' }
  ];

  // Calculate percentages and additional metrics
  const dataWithPercentages = data.map(item => ({
    ...item,
    attendanceRate: Math.round((item.attended / item.invited) * 100),
    dnaRate: Math.round((item.dna / item.invited) * 100),
    rescheduleRate: Math.round((item.rescheduled / item.invited) * 100),
    cancelRate: Math.round((item.cancelled / item.invited) * 100)
  }));

  // Group data by format
  const videoData = data.filter(item => item.format === 'V');
  const f2fData = data.filter(item => item.format === 'F2F');

  // Calculate totals and averages for both formats
  const videoStats = {
    totalInvited: videoData.reduce((sum, item) => sum + item.invited, 0),
    totalAttended: videoData.reduce((sum, item) => sum + item.attended, 0),
    totalDNA: videoData.reduce((sum, item) => sum + item.dna, 0),
    totalRescheduled: videoData.reduce((sum, item) => sum + item.rescheduled, 0),
    totalCancelled: videoData.reduce((sum, item) => sum + item.cancelled, 0)
  };
  
  const f2fStats = {
    totalInvited: f2fData.reduce((sum, item) => sum + item.invited, 0),
    totalAttended: f2fData.reduce((sum, item) => sum + item.attended, 0),
    totalDNA: f2fData.reduce((sum, item) => sum + item.dna, 0),
    totalRescheduled: f2fData.reduce((sum, item) => sum + item.rescheduled, 0),
    totalCancelled: f2fData.reduce((sum, item) => sum + item.cancelled, 0)
  };

  videoStats.attendanceRate = Math.round((videoStats.totalAttended / videoStats.totalInvited) * 100);
  videoStats.dnaRate = Math.round((videoStats.totalDNA / videoStats.totalInvited) * 100);
  f2fStats.attendanceRate = Math.round((f2fStats.totalAttended / f2fStats.totalInvited) * 100);
  f2fStats.dnaRate = Math.round((f2fStats.totalDNA / f2fStats.totalInvited) * 100);

  // Format comparison data
  const formatComparisonData = [
    { name: 'Video', attendanceRate: videoStats.attendanceRate, dnaRate: videoStats.dnaRate },
    { name: 'F2F', attendanceRate: f2fStats.attendanceRate, dnaRate: f2fStats.dnaRate }
  ];

  // Overall outcome distribution data for pie chart
  const totalStats = {
    attended: data.reduce((sum, item) => sum + item.attended, 0),
    dna: data.reduce((sum, item) => sum + item.dna, 0),
    rescheduled: data.reduce((sum, item) => sum + item.rescheduled, 0),
    cancelled: data.reduce((sum, item) => sum + item.cancelled, 0)
  };

  const pieData = [
    { name: 'Attended', value: totalStats.attended },
    { name: 'DNA', value: totalStats.dna },
    { name: 'Rescheduled', value: totalStats.rescheduled },
    { name: 'Cancelled', value: totalStats.cancelled }
  ];

  const COLORS = ['#4CAF50', '#F44336', '#2196F3', '#FFC107'];

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Appointment Analytics Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="flex mb-6 bg-white rounded-lg overflow-hidden shadow">
        <button 
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'trends' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
          onClick={() => setActiveTab('trends')}
        >
          Trends
        </button>
        <button 
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'format' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
          onClick={() => setActiveTab('format')}
        >
          Video vs F2F
        </button>
        <button 
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'insights' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Total Appointments by Status</h2>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} appointments`, null]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Monthly Invitation & Attendance</h2>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="invited" fill="#8884d8" name="Invited" />
                    <Bar dataKey="attended" fill="#82ca9d" name="Attended" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Monthly Appointment Outcomes</h2>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(tick) => `${tick * 100}%`} />
                  <Tooltip formatter={(value, name) => [`${value} appointments`, name]} />
                  <Legend />
                  <Bar dataKey="attended" stackId="a" fill="#4CAF50" name="Attended" />
                  <Bar dataKey="dna" stackId="a" fill="#F44336" name="DNA" />
                  <Bar dataKey="rescheduled" stackId="a" fill="#2196F3" name="Rescheduled" />
                  <Bar dataKey="cancelled" stackId="a" fill="#FFC107" name="Cancelled" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2 text-gray-700">Key Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Total Invited</p>
                  <p className="text-2xl font-bold">{data.reduce((sum, item) => sum + item.invited, 0)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Total Attended</p>
                  <p className="text-2xl font-bold">{totalStats.attended}</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Total DNA</p>
                  <p className="text-2xl font-bold">{totalStats.dna}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Overall Attendance Rate</p>
                  <p className="text-2xl font-bold">{Math.round((totalStats.attended / data.reduce((sum, item) => sum + item.invited, 0)) * 100)}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Format Distribution</h2>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={[
                      {name: 'Video', count: videoData.length, invitations: videoStats.totalInvited},
                      {name: 'F2F', count: f2fData.length, invitations: f2fStats.totalInvited}
                    ]}
                    barSize={60}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Sessions" />
                    <Bar yAxisId="right" dataKey="invitations" fill="#82ca9d" name="Invitations" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <div>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Monthly Trends</h2>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="invited" stroke="#8884d8" name="Invited" strokeWidth={2} />
                  <Line type="monotone" dataKey="attended" stroke="#4CAF50" name="Attended" strokeWidth={2} />
                  <Line type="monotone" dataKey="dna" stroke="#F44336" name="DNA" strokeWidth={2} />
                  <Line type="monotone" dataKey="rescheduled" stroke="#2196F3" name="Rescheduled" strokeWidth={2} />
                  <Line type="monotone" dataKey="cancelled" stroke="#FFC107" name="Cancelled" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Attendance & DNA Rates (%)</h2>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataWithPercentages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, null]} />
                    <Legend />
                    <Line type="monotone" dataKey="attendanceRate" stroke="#4CAF50" name="Attendance Rate" strokeWidth={2} />
                    <Line type="monotone" dataKey="dnaRate" stroke="#F44336" name="DNA Rate" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Reschedule & Cancel Rates (%)</h2>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataWithPercentages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, null]} />
                    <Legend />
                    <Line type="monotone" dataKey="rescheduleRate" stroke="#2196F3" name="Reschedule Rate" strokeWidth={2} />
                    <Line type="monotone" dataKey="cancelRate" stroke="#FFC107" name="Cancel Rate" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Appointment Status Area Chart</h2>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="invited" fill="#8884d8" stroke="#8884d8" name="Invited" />
                  <Area type="monotone" dataKey="attended" fill="#4CAF50" stroke="#4CAF50" name="Attended" />
                  <Area type="monotone" dataKey="dna" fill="#F44336" stroke="#F44336" name="DNA" />
                  <Line type="monotone" dataKey="format" stroke="#000000" name="Format (V/F2F)" dot={{ stroke: '#000000', strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Format Comparison Tab */}
      {activeTab === 'format' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Video vs F2F Attendance Rates</h2>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formatComparisonData} barSize={60}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, null]} />
                    <Legend />
                    <Bar dataKey="attendanceRate" fill="#4CAF50" name="Attendance Rate" />
                    <Bar dataKey="dnaRate" fill="#F44336" name="DNA Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Video Sessions Performance</h2>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={[
                    { 
                      subject: 'Attendance', 
                      Video: videoStats.attendanceRate, 
                      F2F: f2fStats.attendanceRate, 
                      fullMark: 100 
                    },
                    { 
                      subject: 'DNA', 
                      Video: 100-videoStats.dnaRate, 
                      F2F: 100-f2fStats.dnaRate, 
                      fullMark: 100
                    },
                    { 
                      subject: 'Reschedule', 
                      Video: 100-(videoStats.totalRescheduled/videoStats.totalInvited*100), 
                      F2F: 100-(f2fStats.totalRescheduled/f2fStats.totalInvited*100), 
                      fullMark: 100 
                    },
                    { 
                      subject: 'Cancellation', 
                      Video: 100-(videoStats.totalCancelled/videoStats.totalInvited*100), 
                      F2F: 100-(f2fStats.totalCancelled/f2fStats.totalInvited*100), 
                      fullMark: 100 
                    }
                  ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Video" dataKey="Video" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="F2F" dataKey="F2F" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip formatter={(value) => [`${value}%`, null]} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">Note: Higher values indicate better performance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Video Sessions Distribution</h2>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Attended', value: videoStats.totalAttended },
                        { name: 'DNA', value: videoStats.totalDNA },
                        { name: 'Rescheduled', value: videoStats.totalRescheduled },
                        { name: 'Cancelled', value: videoStats.totalCancelled }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} appointments`, null]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-700">F2F Sessions Distribution</h2>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Attended', value: f2fStats.totalAttended },
                        { name: 'DNA', value: f2fStats.totalDNA },
                        { name: 'Rescheduled', value: f2fStats.totalRescheduled },
                        { name: 'Cancelled', value: f2fStats.totalCancelled }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} appointments`, null]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Key Insights</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">General Trends</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>The invitation volume significantly increased in December 2024 and remained high through March 2025.</li>
                <li>Overall attendance rate is {Math.round((totalStats.attended / data.reduce((sum, item) => sum + item.invited, 0)) * 100)}%, with {totalStats.attended} attendees out of {data.reduce((sum, item) => sum + item.invited, 0)} invitations.</li>
                <li>Rescheduling and cancellations began appearing from November 2024 onward, potentially indicating a process change.</li>
                <li>March 2025 had the highest number of DNAs (37), suggesting potential scheduling challenges.</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Video vs F2F Comparison</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Video sessions (8 months) were more frequent than F2F sessions (4 months).</li>
                <li>Video format had a {videoStats.attendanceRate}% attendance rate compared to {f2fStats.attendanceRate}% for F2F.</li>
                <li>F2F sessions had a higher rate of rescheduling ({Math.round((f2fStats.totalRescheduled/f2fStats.totalInvited)*100)}%) compared to Video ({Math.round((videoStats.totalRescheduled/videoStats.totalInvited)*100)}%).</li>
                <li>Video sessions were scheduled for significantly more invitees ({videoStats.totalInvited}) than F2F sessions ({f2fStats.totalInvited}).</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Monthly Highlights</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>May 2024 had the highest attendance rate at {dataWithPercentages[1].attendanceRate}%.</li>
                <li>August 2024 had a particularly high DNA rate at {dataWithPercentages[4].dnaRate}%.</li>
                <li>February 2025 had the highest rescheduling rate at {dataWithPercentages[10].rescheduleRate}%.</li>
                <li>January 2025 had the highest cancellation rate at {dataWithPercentages[9].cancelRate}%.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Recommendations for Waiting List Initiative</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Based on format performance, consider prioritizing Video sessions for the doubled information sessions starting April 2025.</li>
                <li>Implement reminder systems to reduce DNA rates, particularly for Video sessions.</li>
                <li>Consider scheduling patterns that avoid high cancellation/rescheduling months observed in the data.</li>
                <li>Monitor the impact of doubling sessions on attendance rates and adjust strategy if needed.</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Attendance Forecast</h2>
            <p className="mb-4">Based on the current data, if you double the information sessions from April 2025:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Projected Monthly Invitations</h3>
                <p className="text-3xl font-bold text-blue-700">{Math.round(data.reduce((sum, item) => sum + item.invited, 0) / 12 * 2)}</p>
                <p className="text-sm text-gray-600">Based on historical average</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Projected Monthly Attendance</h3>
                <p className="text-3xl font-bold text-green-700">{Math.round(totalStats.attended / 12 * 2)}</p>
                <p className="text-sm text-gray-600">Based on current attendance rate</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Potential Annual Impact</h3>
                <p className="text-3xl font-bold text-purple-700">{Math.round(totalStats.attended * 2)}</p>
                <p className="text-sm text-gray-600">Total annual attendees projection</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;