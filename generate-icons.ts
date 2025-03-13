import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Список сетей и токенов (пример)
const networks = [
  { name: 'ethereum', token: 'eth' },
  { name: 'binance-smart-chain', token: 'bnb' },
  { name: 'polygon', token: 'matic' },
  { name: 'avalanche', token: 'avax' },
  { name: 'fantom', token: 'ftm' },
  { name: 'arbitrum', token: 'arb' },
  { name: 'optimism', token: 'op' },
  { name: 'cronos', token: 'cro' },
  { name: 'moonbeam', token: 'glmr' },
  { name: 'moonriver', token: 'movr' },
  { name: 'aurora', token: 'aurora' },
  { name: 'harmony', token: 'one' },
  { name: 'celo', token: 'celo' },
  { name: 'klaytn', token: 'klay' },
  { name: 'gnosis', token: 'xdai' },
  { name: 'heco', token: 'ht' },
  { name: 'okexchain', token: 'okt' },
  { name: 'telos', token: 'tlos' },
  { name: 'iotex', token: 'iotx' },
  { name: 'boba', token: 'boba' },
  { name: 'metis', token: 'metis' },
  { name: 'fuse', token: 'fuse' },
  { name: 'thundercore', token: 'tt' },
  { name: 'evmos', token: 'evmos' },
  { name: 'velas', token: 'vlx' },
  { name: 'astar', token: 'astr' },
  { name: 'shiden', token: 'sdn' },
  { name: 'godwoken', token: 'ckb' },
  { name: 'skale', token: 'skl' },
  { name: 'canto', token: 'canto' },
];

const baseUrl = 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master';

// Функция для создания директории, если она не существует
async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Функция для загрузки и сохранения файла
async function downloadFile(url, path) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Не удалось загрузить ${url}: ${response.statusText}`);
      return;
    }
    const buffer = await response.arrayBuffer();
    await writeFile(path, Buffer.from(buffer)); // Перезаписывает файл, если он существует
    console.log(`Сохранено: ${path}`);
  } catch (error) {
    console.error(`Ошибка при загрузке ${url}:`, error);
  }
}

// Основная функция
async function generateFiles() {
  for (const network of networks) {
    const { name, token } = network;

    // Создаем директорию для сети
    const dir = join('icons', name);
    await ensureDir(dir);

    // Загружаем и сохраняем файлы (например, иконки)
    await downloadFile(
      `${baseUrl}/svg/black/${token}.svg`,
      join(dir, 'dark.svg')
    );
    await downloadFile(
      `${baseUrl}/svg/white/${token}.svg`,
      join(dir, 'light.svg')
    );
  }
}

// Запускаем выполнение
generateFiles().catch(console.error);
