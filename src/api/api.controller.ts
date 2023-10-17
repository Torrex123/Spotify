import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiService } from './api.service';


@Controller('api')
export class ApiController {

    constructor(private readonly apiService: ApiService) {}

    @Get('scatterDanceabilityLoudness')
    async scatterDanceabilityLoudness(@Res() res,
                                      @Query('artist') artist?: string,
                                      @Query('top') top?: number,
                                      @Query('date') date?: string
                                      ) {
        res.status(200).json({
            "position": 1,
            "title": "Loudness vs. Danceability",
            "type": "scatter",
            "datasets":[await this.apiService.scatterDanceabilityLoudness(artist, top, date)],
            "xlabel": "Danceability",
            "ylabel": "Loudness"
        });
    }

    @Get('albumTypeDistribution')
    async albumTypeDistribution(
        @Query('artist') artist: string,
        @Query ('top') top: number,
        @Query ('date') date: string,
        @Res() res,
    ) {
        res.status(200).json({
            "position": 2,
            "title": "Album Type Distribution",
            "type": "pie",
            "datasets": await this.apiService.getAlbumTypeDistribution(artist, top, date),
            "xlabel": "album type",
            "ylabel": "count"
        });
    }

    @Get('artistByTrackNumber')
    async artistByTrackNumber(@Res() res,
                              @Query('artist') artist?: string,
                              @Query('top') top?: number,
                              @Query('date') date?: string
                              ) {
        res.status(200).json({
            "position": 3,
            "title": "Artist by Track Number",
            "type": "bar",
            "datasets": await this.apiService.totalTracksByArtistName(artist, top, date),
            "xlabel": "Artist",
            "ylabel": "total tracks"
        });
    }

    @Get('tracksThroughTime')
    async tracksThroughTime(
        @Query('artist') artist: string,
        @Query ('top') top: number,
        @Query ('date') date: string,
        @Res() res) {
        res.status(200).json({
            "position": 4,
            "title": "Number of Tracks Over Time",
            "type": "line",
            "datasets": await this.apiService.numberOfTracksOverTime(artist, top, date),
            "xlabel": "Year",
            "ylabel": "Count"
        });
    }

    @Get('scatterInstrumentalnessEnergy')
    async scatterInstrumentalnessEnergy(@Res() res,
                                      @Query('artist') artist?: string,
                                      @Query('top') top?: number,
                                      @Query('date') date?: string
                                      ) {
        res.status(200).json({
            "position": 5,
            "title": "Instrumentalness vs Energy",
            "type": "scatter",
            "datasets":[await this.apiService.scatterInstrumentalnessEnergy(artist, top, date)],
            "xlabel": "Instrumentalness",
            "ylabel": "Energy"
        });
    }

    @Get('artists')
    async retrieveArtist() {

        return await this.apiService.ArtistsByTrackNumber()
    }
}
