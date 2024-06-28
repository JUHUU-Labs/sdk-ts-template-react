import { Juhuu } from "@juhuu/sdk-ts";

// Define the Environment type explicitly
type Environment = 'production' | 'staging' | 'development';

interface ExtendedSetupConfig {
  clientVersion: string;
  environment: Environment; // Use the explicit Environment type
  getAccessToken: () => Promise<string>;
  getRefreshToken: () => Promise<string>;
  onException: (error: any) => Promise<string>;
  setAccessToken: (accessToken: string) => Promise<void>;
  setRefreshToken: (refreshToken: string) => Promise<void>;
}

class ExtendedJuhuu extends Juhuu {
  private config: ExtendedSetupConfig;

  constructor(config: ExtendedSetupConfig) {
    super(config as any); // Type assertion here
    this.config = config;
  }

  async listProducts(params: Record<string, any>): Promise<any> {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await this.config.getAccessToken()}`,
        },
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      await this.config.onException(error);
      return { ok: false, error };
    }
  }

  async getProduct(id: string): Promise<any> {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await this.config.getAccessToken()}`,
        },
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      await this.config.onException(error);
      return { ok: false, error };
    }
  }
}

export const juhuu = new ExtendedJuhuu({
  clientVersion: "1.0.300",
  environment: 'production', // Use a valid environment value
  getAccessToken: async () => {
    return "token";
  },
  getRefreshToken: async () => {
    return "refreshToken";
  },
  onException: async (error) => {
    console.error(error);
    return "abort";
  },
  setAccessToken: async (accessToken) => {
    console.log(accessToken);
  },
  setRefreshToken: async (refreshToken) => {
    console.log(refreshToken);
  },
});
