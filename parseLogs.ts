import * as fs from "fs-extra";
import * as path from "path";
import * as readline from "readline";
import * as XLSX from "xlsx";

// ログファイルのディレクトリ
const logDir = "./logs";

// 出力ファイル
const outputFile = "parsed_logs.xlsx";

// ログファイルの解析
const parseLogFile = async (filePath: string) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const logs: any[] = [];

  for await (const line of rl) {
    const parts = line
      .match(/(".*?"|\S+)/g)
      ?.map((part) => part.replace(/(^"|"$)/g, "")); // ダブルクォーテーションを削除
    if (parts) {
      logs.push({
        BucketOwner: parts[0],
        Bucket: parts[1],
        Time: parts[2] + " " + parts[3],
        RemoteIP: parts[4],
        Requester: parts[5],
        RequestID: parts[6],
        Operation: parts[7],
        Key: parts[8],
        RequestURI: parts[9],
        HTTPStatus: parts[10],
        ErrorCode: parts[11],
        BytesSent: parts[12],
        ObjectSize: parts[13],
        TotalTime: parts[14],
        TurnAroundTime: parts[15],
        Referrer: parts[16],
        UserAgent: parts[17],
        VersionId: parts[18],
        HostID: parts[19],
        SigV: parts[20],
        CipherSuite: parts[21],
        AuthType: parts[22],
        Endpoint: parts[23],
        TLSVersion: parts[24],
        AccessPointARN: parts[25],
        ACLRequired: parts[26],
      });
    }
  }

  return logs;
};

// 全てのログファイルを解析
const parseAllLogs = async () => {
  const files = await fs.readdir(logDir);
  const allLogs: any[] = [];

  for (const file of files) {
    const filePath = path.join(logDir, file);
    const logs = await parseLogFile(filePath);
    allLogs.push(...logs);
  }

  return allLogs;
};

// Excelファイルを作成
const createExcelFile = async (data: any[]) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Logs");
  XLSX.writeFile(wb, outputFile);
};

// メイン処理
const main = async () => {
  const allLogs = await parseAllLogs();
  await createExcelFile(allLogs);
  console.log(`Excel file ${outputFile} created successfully!`);
};

main().catch((err) => console.error(err));
