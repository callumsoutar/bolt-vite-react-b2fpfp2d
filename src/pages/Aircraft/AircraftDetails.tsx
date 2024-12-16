import React, { useState } from 'react';
import { useAircraftStore } from '../../store/useAircraftStore';
import {
  Settings,
  Wrench,
  AlertCircle,
  DollarSign,
  FileText,
  History,
} from 'lucide-react';

interface AircraftDetailsProps {
  id: string;
}

const AircraftDetails: React.FC<AircraftDetailsProps> = ({ id }) => {
  const { getAircraft } = useAircraftStore();
  const [activeTab, setActiveTab] = useState('details');
  const aircraft = getAircraft(id);

  if (!aircraft) return null;

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {aircraft.registration}
          </h2>
          <p className="text-gray-500">{aircraft.type}</p>
        </div>

        <div className="border-t">
          <div className="flex items-center gap-1 p-2 bg-gray-50">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  activeTab === 'details'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <Settings className="h-4 w-4" />
              Details
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  activeTab === 'equipment'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <Wrench className="h-4 w-4" />
              Equipment
            </button>
            <button
              onClick={() => setActiveTab('defects')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  activeTab === 'defects'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <AlertCircle className="h-4 w-4" />
              Defects
            </button>
            <button
              onClick={() => setActiveTab('rates')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  activeTab === 'rates'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <DollarSign className="h-4 w-4" />
              Charge Rates
            </button>
            <button
              onClick={() => setActiveTab('techlog')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  activeTab === 'techlog'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <FileText className="h-4 w-4" />
              Tech Log
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  activeTab === 'history'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <History className="h-4 w-4" />
              Flight History
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Opening Values
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">
                          Opening Date
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.opening_date || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Opening Tacho
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.opening_tacho || '0'}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Opening Total Time
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.opening_total_time || '0'}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Opening Tacho Time
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.opening_tacho_time || '0'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Current Status
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">Status</label>
                        <p className="text-sm font-medium capitalize">
                          {aircraft.status}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Total Hours
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.total_hours || '0'}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Maintenance Due
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.maintenance_due || 'Not set'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Settings
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs text-gray-500">
                          Engine Count
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.engine_count}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Total Time Method
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.total_time_method}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Fuel Consumption
                        </label>
                        <p className="text-sm font-medium">
                          {aircraft.fuel_consumption || '0'} L/hr
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">
                          Recording Options
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded border ${
                                aircraft.record_airswitch
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'border-gray-300'
                              }`}
                            />
                            <span className="text-sm">Record Airswitch</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded border ${
                                aircraft.record_hobbs
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'border-gray-300'
                              }`}
                            />
                            <span className="text-sm">Record Hobbs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded border ${
                                aircraft.record_tacho
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'border-gray-300'
                              }`}
                            />
                            <span className="text-sm">Record Tacho</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">
                          Availability
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded border ${
                                aircraft.is_online
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'border-gray-300'
                              }`}
                            />
                            <span className="text-sm">Online</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded border ${
                                aircraft.for_hire
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'border-gray-300'
                              }`}
                            />
                            <span className="text-sm">For Hire</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded border ${
                                aircraft.for_ato
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'border-gray-300'
                              }`}
                            />
                            <span className="text-sm">For ATO</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'equipment' && (
              <div className="text-gray-500">
                Equipment information will be displayed here.
              </div>
            )}

            {activeTab === 'defects' && (
              <div className="text-gray-500">
                Defects information will be displayed here.
              </div>
            )}

            {activeTab === 'rates' && (
              <div className="text-gray-500">
                Charge rates information will be displayed here.
              </div>
            )}

            {activeTab === 'techlog' && (
              <div className="text-gray-500">
                Tech log information will be displayed here.
              </div>
            )}

            {activeTab === 'history' && (
              <div className="text-gray-500">
                Flight history information will be displayed here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftDetails;
