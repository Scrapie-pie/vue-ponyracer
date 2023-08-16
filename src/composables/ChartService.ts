import { ChartData, ChartOptions } from 'chart.js';
import { ScoreHistoryModel } from '@/models/UserModel';
import { fr } from 'date-fns/locale';

export function useChartService() {
  return {
    getData(history: Array<ScoreHistoryModel>, label: string): ChartData {
      return {
        labels: history.map(event => event.instant),
        datasets: [
          {
            label,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: 'origin',
            tension: 0.2,
            data: history.map(event => event.money)
          }
        ]
      };
    },
    getOptions(locale: 'en' | 'fr'): ChartOptions {
      return {
        locale,
        scales: {
          x: {
            type: 'time',
            adapters: {
              date: {
                locale: locale === 'fr' ? fr : null
              }
            }
          }
        }
      };
    }
  };
}
