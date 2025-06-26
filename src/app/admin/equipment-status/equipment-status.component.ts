import { Component } from '@angular/core';

interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'in-use' | 'maintenance' | 'offline';
  location: string;
  lastCalibration: Date;
  nextMaintenance: Date;
  currentTest?: string;
  specifications: { [key: string]: string };
}

@Component({
  selector: 'app-equipment-status',
  templateUrl: './equipment-status.component.html',
  styleUrls: ['./equipment-status.component.scss'],
})
export class EquipmentStatusComponent {
  equipmentList: Equipment[] = [
    {
      id: 'UTM-001',
      name: 'Instron 5985 Universal Testing Machine',
      type: 'Tensile Tester',
      status: 'in-use',
      location: 'Lab Room A',
      lastCalibration: new Date('2024-01-01'),
      nextMaintenance: new Date('2024-02-15'),
      currentTest: 'Steel Rod Tensile Test (TS-2024-001)',
      specifications: {
        'Max Load': '250 kN',
        'Speed Range': '0.001-500 mm/min',
        Accuracy: '±0.5%',
      },
    },
    {
      id: 'CTM-002',
      name: 'Compression Testing Machine',
      type: 'Compression Tester',
      status: 'available',
      location: 'Lab Room B',
      lastCalibration: new Date('2023-12-15'),
      nextMaintenance: new Date('2024-03-01'),
      specifications: {
        'Max Load': '2000 kN',
        'Platen Size': '200x200 mm',
        Accuracy: '±1%',
      },
    },
    {
      id: 'HT-003',
      name: 'Rockwell Hardness Tester',
      type: 'Hardness Tester',
      status: 'available',
      location: 'Lab Room C',
      lastCalibration: new Date('2024-01-10'),
      nextMaintenance: new Date('2024-04-10'),
      specifications: {
        Scales: 'HRA, HRB, HRC',
        'Load Range': '15-150 kg',
        Accuracy: '±1 HRC',
      },
    },
    {
      id: 'IT-004',
      name: 'Charpy Impact Tester',
      type: 'Impact Tester',
      status: 'maintenance',
      location: 'Lab Room D',
      lastCalibration: new Date('2023-11-20'),
      nextMaintenance: new Date('2024-01-20'),
      specifications: {
        'Energy Range': '0-300 J',
        'Hammer Weight': '25 kg',
        Accuracy: '±1%',
      },
    },
    {
      id: 'FT-005',
      name: 'Fatigue Testing Machine',
      type: 'Fatigue Tester',
      status: 'offline',
      location: 'Lab Room E',
      lastCalibration: new Date('2023-10-01'),
      nextMaintenance: new Date('2024-01-15'),
      specifications: {
        'Max Load': '100 kN',
        Frequency: '0.1-200 Hz',
        Waveform: 'Sine, Triangle, Square',
      },
    },
    {
      id: 'BT-006',
      name: 'Three-Point Bend Tester',
      type: 'Flexural Tester',
      status: 'available',
      location: 'Lab Room A',
      lastCalibration: new Date('2024-01-05'),
      nextMaintenance: new Date('2024-04-05'),
      specifications: {
        'Max Load': '50 kN',
        'Span Range': '50-400 mm',
        Accuracy: '±0.5%',
      },
    },
  ];

  // Modal states
  showMaintenanceModal: boolean = false;
  showAddEquipmentModal: boolean = false;
  selectedEquipmentId: string = '';
  maintenanceDate: string = '';
  maintenanceNotes: string = '';
  newEquipment: Partial<Equipment> = {
    id: '',
    name: '',
    type: '',
    status: 'available',
    location: '',
    lastCalibration: new Date(),
    nextMaintenance: new Date(),
    specifications: {},
  };
  specEntries: { key: string; value: string }[] = [];

  openMaintenanceModal() {
    this.showMaintenanceModal = true;
  }

  closeMaintenanceModal() {
    this.showMaintenanceModal = false;
    this.selectedEquipmentId = '';
    this.maintenanceDate = '';
    this.maintenanceNotes = '';
  }

  scheduleMaintenance() {
    // Implement maintenance scheduling logic here
    console.log('Scheduling maintenance for:', {
      equipmentId: this.selectedEquipmentId,
      date: this.maintenanceDate,
      notes: this.maintenanceNotes,
    });
    // Optionally update equipment status or nextMaintenance date
    const equipment = this.equipmentList.find(
      (eq) => eq.id === this.selectedEquipmentId
    );
    if (equipment && this.maintenanceDate) {
      equipment.nextMaintenance = new Date(this.maintenanceDate);
      equipment.status = 'maintenance';
    }
    this.closeMaintenanceModal();
  }

  openAddEquipmentModal() {
    this.showAddEquipmentModal = true;
    this.specEntries = [];
  }

  closeAddEquipmentModal() {
    this.showAddEquipmentModal = false;
    this.newEquipment = {
      id: '',
      name: '',
      type: '',
      status: 'available',
      location: '',
      lastCalibration: new Date(),
      nextMaintenance: new Date(),
      specifications: {},
    };
    this.specEntries = [];
  }

  addSpec() {
    this.specEntries.push({ key: '', value: '' });
  }

  removeSpec(index: number) {
    this.specEntries.splice(index, 1);
  }

  addEquipment() {
    // Convert specEntries to specifications object
    this.newEquipment.specifications = this.specEntries.reduce((acc, spec) => {
      if (spec.key && spec.value) {
        acc[spec.key] = spec.value;
      }
      return acc;
    }, {} as { [key: string]: string });

    // Generate a unique ID for the new equipment
    const newId = `EQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const equipment: Equipment = {
      ...this.newEquipment,
      id: newId,
      lastCalibration: new Date(this.newEquipment.lastCalibration!),
      nextMaintenance: new Date(this.newEquipment.nextMaintenance!),
      specifications: this.newEquipment.specifications || {},
    } as Equipment;

    this.equipmentList.push(equipment);
    this.closeAddEquipmentModal();
  }

  getEquipmentCount(status: string): number {
    return this.equipmentList.filter((eq) => eq.status === status).length;
  }

  isMaintenanceDue(date: Date): boolean {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }
}
