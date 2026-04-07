"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import { Upload, Table2, BookOpen, X, AlertCircle } from "lucide-react";
import CodeEditor from "@/components/editor/CodeEditor";
import DataTable from "@/components/visualizer/DataTable";
import StepIndicator from "@/components/visualizer/StepIndicator";
import ErrorBalloon from "@/components/visualizer/ErrorBalloon";
import { usePandasParser, DataRow } from "@/hooks/usePandasParser";
import { getSamplePokemon } from "@/data/missionData";

function pokemonToDataRow(p: ReturnType<typeof getSamplePokemon>[0]): DataRow {
  return {
    "#": p["#"],
    Name: p.Name,
    "Type 1": p["Type 1"],
    "Type 2": p["Type 2"],
    HP: p.HP,
    Attack: p.Attack,
    Defense: p.Defense,
    "Sp. Atk": p["Sp. Atk"],
    "Sp. Def": p["Sp. Def"],
    Speed: p.Speed,
    Generation: p.Generation,
    Legendary: p.Legendary,
  };
}

const SAMPLE_DATA: DataRow[] = getSamplePokemon().map(pokemonToDataRow);

export default function PracticePage() {
  const [data, setData] = useState<DataRow[]>(SAMPLE_DATA);
  const [columns, setColumns] = useState<string[]>(Object.keys(SAMPLE_DATA[0] || {}));
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"sample" | "upload">("sample");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { state, runCode, reset } = usePandasParser(data);

  const handleCSVUpload = useCallback((file: File) => {
    setUploadError(null);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const rows = result.data as Record<string, string>[];
        if (rows.length === 0) {
          setUploadError("CSV 파일에 데이터가 없습니다.");
          return;
        }
        if (rows.length > 20) {
          setUploadError(`CSV 최대 20행까지만 지원합니다. (현재: ${rows.length}행) 첫 20행만 사용합니다.`);
        }
        const limited = rows.slice(0, 20);
        const parsed: DataRow[] = limited.map((row) => {
          const r: DataRow = {};
          Object.entries(row).forEach(([k, v]) => {
            const n = Number(v);
            if (v === "True" || v === "true") r[k] = true;
            else if (v === "False" || v === "false") r[k] = false;
            else if (!isNaN(n) && v.trim() !== "") r[k] = n;
            else r[k] = v;
          });
          return r;
        });
        const cols = Object.keys(parsed[0]);
        setData(parsed);
        setColumns(cols);
        setDataSource("upload");
        reset();
      },
      error: (err) => {
        setUploadError(`파일 파싱 오류: ${err.message}`);
      },
    });
  }, [reset]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCSVUpload(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) {
      handleCSVUpload(file);
    } else {
      setUploadError("CSV 파일만 업로드 가능합니다.");
    }
  };

  const handleUseSample = () => {
    const newSample = getSamplePokemon().map(pokemonToDataRow);
    setData(newSample);
    setColumns(Object.keys(newSample[0]));
    setDataSource("sample");
    reset();
    setUploadError(null);
  };

  const errorStep = state.currentStep.type === "error" ? state.currentStep : null;

  // 애니메이션 중일 때 표시할 데이터
  const displayData = (state.currentStep.type === "done" || state.currentStep.type === "idle")
    ? (state.finalData.length > 0 ? state.finalData : data)
    : data;
  const displayColumns = (state.currentStep.type === "done" && state.finalColumns.length > 0)
    ? state.finalColumns
    : columns;

  return (
    <div className="flex-1 bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">자유 연습 모드</h1>
            <p className="text-sm text-gray-500">
              {dataSource === "sample"
                ? `포켓몬 샘플 데이터 (${data.length}행)`
                : `업로드된 CSV (${data.length}행)`}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 
                         hover:border-blue-400 hover:bg-blue-50 rounded-xl text-xs text-gray-700
                         transition-colors shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              CSV 업로드
            </button>
            <button
              onClick={handleUseSample}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200
                         hover:border-blue-400 hover:bg-blue-50 rounded-xl text-xs text-gray-700
                         transition-colors shadow-sm"
            >
              <Table2 className="w-3.5 h-3.5" />
              샘플 재생성
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* 업로드 에러 */}
        <AnimatePresence>
          {uploadError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-200 
                         rounded-xl px-4 py-3 text-sm text-amber-800"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{uploadError}</span>
              <button onClick={() => setUploadError(null)} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 드래그 앤 드롭 영역 (데이터 없을 때) */}
        {data.length === 0 && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center
                       hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer mb-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">CSV 파일을 드래그하거나 클릭하여 업로드</p>
            <p className="text-gray-400 text-sm mt-1">최대 20행, UTF-8 인코딩</p>
          </div>
        )}

        {/* 메인 레이아웃 */}
        {data.length > 0 && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* 좌측: 테이블 */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Table2 className="w-4 h-4 text-gray-500" />
                    데이터프레임 (df)
                  </h2>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                    {data.length}행 × {columns.length}열
                  </span>
                </div>

                {/* 에러 말풍선 */}
                <div className="relative mb-3">
                  <ErrorBalloon
                    errorType={errorStep?.errorType}
                    message={errorStep?.message}
                    onClose={reset}
                  />
                </div>

                {/* 에러 시 테이블 흔들기 */}
                <motion.div
                  animate={errorStep ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <DataTable
                    data={data}
                    columns={columns}
                    parserState={state}
                  />
                </motion.div>
              </div>

              {/* 결과 테이블 */}
              <AnimatePresence>
                {state.currentStep.type === "done" && state.finalData.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 rounded-xl shadow-sm border border-green-200 p-4"
                  >
                    <h2 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                      ✅ 실행 결과
                      <span className="ml-auto text-xs font-normal text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                        {state.finalData.length}행 × {state.finalColumns.length}열
                      </span>
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-green-200 bg-white">
                      <table className="min-w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-green-600">
                            <th className="px-3 py-2 text-white text-left w-8">#</th>
                            {displayColumns.map((col) => (
                              <th key={col} className="px-3 py-2 text-white text-left font-bold whitespace-nowrap">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {state.finalData.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-green-50/30"}>
                              <td className="px-3 py-2 text-gray-400">{i}</td>
                              {displayColumns.map((col) => (
                                <td key={col} className="px-3 py-2 text-gray-700 whitespace-nowrap">
                                  {String(row[col])}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 우측: 코드 에디터 + 단계 안내 */}
            <div className="space-y-4">
              <StepIndicator
                currentStep={state.currentStep}
                isAnimating={state.isAnimating}
              />
              <CodeEditor
                onRun={runCode}
                onReset={reset}
                isAnimating={state.isAnimating}
                columnNames={columns}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
