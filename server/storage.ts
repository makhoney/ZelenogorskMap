import { type User, type InsertUser, type Location, type InsertLocation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getLocations(): Promise<Location[]>;
  getLocation(id: string): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  updateLocation(id: string, location: Partial<InsertLocation>): Promise<Location | undefined>;
  deleteLocation(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private locations: Map<string, Location>;

  constructor() {
    this.users = new Map();
    this.locations = new Map();
    
    // Initialize with sample Zelenogorsk locations
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleLocations: InsertLocation[] = [
      {
        title: "ТЦ Зеленый",
        address: "ул. Ленина, 15",
        type: "Торговый центр",
        status: "active",
        description: "Крупный торговый центр в центре города с широким ассортиментом магазинов и услуг.",
        lat: 56.115,
        lng: 94.545
      },
      {
        title: "Городской парк",
        address: "ул. Парковая, 1",
        type: "Парк",
        status: "active",
        description: "Центральный городской парк с зонами отдыха и детскими площадками.",
        lat: 56.125,
        lng: 94.555
      },
      {
        title: "Спортивный комплекс",
        address: "ул. Спортивная, 8",
        type: "Спорт",
        status: "active",
        description: "Современный спортивный комплекс с бассейном и тренажерными залами.",
        lat: 56.118,
        lng: 94.570
      },
      {
        title: "Библиотека",
        address: "ул. Культуры, 3",
        type: "Культура",
        status: "active",
        description: "Центральная городская библиотека с читальными залами и компьютерным центром.",
        lat: 56.108,
        lng: 94.535
      },
      {
        title: "Медицинский центр",
        address: "ул. Здоровья, 12",
        type: "Медицина",
        status: "active",
        description: "Многопрофильный медицинский центр с современным оборудованием.",
        lat: 56.130,
        lng: 94.575
      }
    ];

    sampleLocations.forEach(location => {
      const id = randomUUID();
      const fullLocation: Location = { 
        ...location, 
        id,
        description: location.description || null 
      };
      this.locations.set(id, fullLocation);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocation(id: string): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const id = randomUUID();
    const location: Location = { 
      ...insertLocation, 
      id,
      description: insertLocation.description || null 
    };
    this.locations.set(id, location);
    return location;
  }

  async updateLocation(id: string, updateData: Partial<InsertLocation>): Promise<Location | undefined> {
    const location = this.locations.get(id);
    if (!location) return undefined;

    const updatedLocation: Location = { ...location, ...updateData };
    this.locations.set(id, updatedLocation);
    return updatedLocation;
  }

  async deleteLocation(id: string): Promise<boolean> {
    return this.locations.delete(id);
  }
}

export const storage = new MemStorage();
