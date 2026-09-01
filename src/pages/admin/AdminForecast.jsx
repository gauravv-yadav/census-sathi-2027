import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Filter, MapPin, Search, Download, Building, Home, TrendingUp } from 'lucide-react';

export default function AdminForecast() {
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const detailedData = [
    { state: "Maharashtra", city: "Mumbai", colony: "Bandra West (Sector 4)", target: "12,500", completed: "10,200", rate: "81.6%", status: "Ahead of Target" },
    { state: "Maharashtra", city: "Pune", colony: "Kothrud (Block 12)", target: "9,800", completed: "7,400", rate: "75.5%", status: "On Track" },
    { state: "Delhi NCR", city: "New Delhi", colony: "Vasant Vihar (Phase 2)", target: "15,000", completed: "12,900", rate: "86.0%", status: "Ahead of Target" },
    { state: "Karnataka", city: "Bengaluru", colony: "Jayanagar (4th Block)", target: "18,200", completed: "12,100", rate: "66.4%", status: "Attention Needed" },
    { state: "Karnataka", city: "Mysuru", colony: "Gokulam (Sector 3)", target: "6,500", completed: "5,300", rate: "81.5%", status: "On Track" },
    { state: "West Bengal", city: "Kolkata", colony: "Salt Lake (Sector V)", target: "14,000", completed: "9,800", rate: "70.0%", status: "Attention Needed" },
    { state: "Gujarat", city: "Ahmedabad", colony: "Navrangpura (Block A)", target: "11,200", completed: "9,400", rate: "83.9%", status: "Ahead of Target" }
  ];

  const filteredData = detailedData.filter(item => {
    const matchesState = selectedState === 'All' || item.state === selectedState;
    const matchesCity = selectedCity === 'All' || item.city === selectedCity;
    const matchesSearch = item.colony.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesCity && matchesSearch;
  });

  return (
    <div>
      <Navbar />
      <main className="page-content container">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h1>Location Intelligence: State, City & Colony Breakdown</h1>
            <p>Granular demographic coverage analysis down to local colony blocks</p>
          </div>
          <button className="btn-secondary" onClick={() => alert("Exporting Geographic CSV...")}>
            <Download size={18} /> Export Geographic CSV
          </button>
        </div>

        {/* State / City / Colony Filter Controls */}
        <div className="card mb-4" style={{ backgroundColor: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
            
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                Filter by State
              </label>
              <select className="input-field" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                <option value="All">All States (National)</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Karnataka">Karnataka</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                Filter by City
              </label>
              <select className="input-field" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="All">All Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                Search Colony / Sector
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Type colony name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Colony Level Data Table */}
        <div className="card" style={{ backgroundColor: 'white', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building size={20} color="var(--primary-color)" /> Colony-Wise Enumeration Table ({filteredData.length} Records Found)
            </h3>
            <span className="badge verified">Real-Time Data Feed</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>State</th>
                  <th style={{ padding: '1rem 1.5rem' }}>City</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Colony / Sector</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Target Households</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Completed Count</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Completion Rate</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>{row.state}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{row.city}</td>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>{row.colony}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{row.target}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{row.completed}</td>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: '#059669' }}>{row.rate}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span className={`badge ${
                        row.status === 'Ahead of Target' ? 'verified' : 
                        row.status === 'Attention Needed' ? 'false' : 'misleading'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
