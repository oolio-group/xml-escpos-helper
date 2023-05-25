export class Command {

  public static ESC: number        = 0x1B;
  public static FF: number         = 0x0C;
  public static FS: number         = 0x1C;
  public static GS: number         = 0x1D;
  public static DC1: number        = 0x11;
  public static DC4: number        = 0x14;
  public static DLE: number        = 0x10;
  public static NL: number         = 0x0A;
  public static SP: number         = 0x20;
  public static US: number         = 0x1F;

  public static DLE_EOT            = (n: number): number[] => [Command.DLE, 0x04, n]; // DLEEOTn

  public static ESC_init: number[] = [Command.ESC, 0x40]; //ESC@
  public static ESC_L              = [Command.ESC, 0x4C]; //ESCL
  public static ESC_W              = [Command.ESC, 0x57]; //ESCW
  public static ESC_exclamation    = (n: number): number[] => [Command.ESC, 0x21, n]; // ESC!n
  public static ESC_minus          = (n: number): number[] => [Command.ESC, 0x2D, n]; // ESC-n
  public static ESC_rev            = (n: number): number[] => [Command.ESC, 0x7B, n]; // ESC{n
  public static ESC_a              = (n: number): number[] => [Command.ESC, 0x61, n]; // ESCan
  public static ESC_d              = (n: number): number[] => [Command.ESC, 0x64, n]; // ESCdn
  public static ESC_E              = (n: number): number[] => [Command.ESC, 0x45, n]; // ESCEn
  public static ESC_G              = (n: number): number[] => [Command.ESC, 0x47, n]; // ESCGn
  public static ESC_J              = (n: number): number[] => [Command.ESC, 0x4A, n]; // ESCJn
  public static ESC_M              = (n: number): number[] => [Command.ESC, 0x4D, n]; // ESCMn
  public static ESC_T              = (n: number): number[] => [Command.ESC, 0x54, n]; // ESCTn
  public static ESC_t              = (n: number): number[] => [Command.ESC, 0x07, n]; // ESCtn
  public static ESC_Z              = (m: number, n: number, k: number): number[] => [Command.ESC, 0x5A, m, n, k]; // ESCZmnk

  public static FS_and: number[]   = [Command.FS, 0x40]; //ESC@
  public static FS_ob_C_fe_utf     = [Command.FS, 0x28, 0x43, 0x02, 0x00, 0x30, 0x02]; //UTF-8 encoding

  public static GS_exclamation     = (n: number): number[] => [Command.GS, 0x21, n]; // ESC!n
  public static GS_B               = (n: number): number[] => [Command.GS, 0x42, n]; // GSBn
  public static GS_f               = (n: number): number[] => [Command.GS, 0x66, n]; // GSfn
  public static GS_h               = (n: number): number[] => [Command.GS, 0x68, n]; // GShn
  public static GS_H               = (n: number): number[] => [Command.GS, 0x48, n]; // GSHn
  public static GS_K               = (m: number, n: number): number[] => [Command.GS, 0x6B, m, n]; // GSKmn
  public static GS_v0              = (m: number): number[] => [Command.GS, 0x76, 0x30, m]; // GSv0m
  public static GS_w               = (n: number): number[] => [Command.GS, 0x77, n]; // GSwn
  public static GS_x               = (n: number): number[] => [Command.GS, 0x78, n]; // GSxn
  public static GS_v               = (m: number, n: number): number[] => [Command.GS, 0x56, m, n]; // GSv
  public static ESC_ak             = (n: number): number[] => [Command.ESC, 0x2A, n]; // ESC*n
  public static ESC_akp             = (m: number, nL: number,nH: number ): number[] => [Command.ESC, 0x2A, m, nL, nH]; // ESC*n

  public static LF: number[]       = [Command.NL];


  // Cash Drawer
  public static CD_KICK_1          = (): number[] => [Command.ESC, 0x70, 0x00];  // Sends a pulse to pin 2
  public static CD_KICK_2          = (): number[] => [Command.ESC, 0x70, 0x01];  // Sends a pulse to pin 5

  //QR Code
  public static QR_MODEL =(n: number): number[]=> [29, 40, 107, 4, 0, 49, 65, n, 0]; //Select QR model, n = 49/50
  //[29 40 107 4 0 49 65 n1 n2]
  public static QR_SIZE =(n: number): number[] => [29, 40, 107, 3, 0, 49, 67, n]; //Set QR size, n = 8?
  //[29 40 107 3 0 49 67 n]
  public static EC_LEVEL =(n: number): number[] => [29, 40, 107, 3, 0, 49, 69, n]; //Set error correction level for QR, n = 48/49/50/51
  //[29 40 107 3 0 49 69 n]
  public static STORE_QR =(pL, pH): number[] => [29, 40, 107, pL, pH, 49, 80, 48]; //Store QR data in symbol storage area
  //[29 40 107 pL pH 49 80 48 d1…dk]
  public static PRINT_QR =(): number[] => [29, 40, 107, 3, 0, 49, 81, 48]; //Print QR from data in symbol storage area
  //[29 40 107 3 0 49 81 m]
}
