import axios from 'axios';
import FormData from 'form-data';
import { IUploadFactoryServiceType } from './upload-factory-type';

export class ImgurUploadService implements IUploadFactoryServiceType {
  private clientId: string = process.env.IMGUR_ID || '';
  private accessToken: string = process.env.IMGUR_ACCESS_TOKEN || '';
  private refreshToken: string = process.env.IMGUR_REFRESH_TOKEN || '';
  private albumId: string = process.env.IMGUR_ALBUM_ID || '';

  private async refreshAccessToken(): Promise<void> {
    const formData = new URLSearchParams();
    formData.append('refresh_token', this.refreshToken);
    formData.append('client_id', this.clientId);
    formData.append('grant_type', 'refresh_token');

    const response = await axios.post(
      'https://api.imgur.com/oauth2/token',
      formData.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to refresh token: ${response.data.error}`);
    }

    this.accessToken = response.data.access_token;
  }

  async upload(buffer: Buffer, filename?: string): Promise<string> {
    if (!buffer) {
      throw new Error('No buffer provided for upload.');
    }

    const formData = new FormData();
    formData.append('image', buffer, { filename });
    formData.append('type', 'file');
    formData.append('title', 'Avatar');
    formData.append('description', 'Uploaded via API');
    formData.append('album', this.albumId);
    formData.append('privacy', 'hidden');

    try {
      const response = await axios.post(
        'https://api.imgur.com/3/image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            ...formData.getHeaders(),
          },
        }
      );

      if (
        response.status === 403 &&
        response.data.data.error === 'The access token provided is invalid'
      ) {
        await this.refreshAccessToken();
        return this.upload(buffer, filename);
      }

      if (response.status !== 200) {
        throw new Error(response.data.data.error);
      }

      return response.data.data.link;
    } catch (error: any) {
      throw new Error('Failed to upload image to Imgur: ' + error.message);
    }
  }
}
