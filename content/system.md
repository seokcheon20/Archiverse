---
title: "Archiverse : 삶은 기록 너머 우주"
aliases:
  - Archiverse documentation
tags:
  - main/system
date: 2025-09-10
---
# 'Archiverse : 삶은 기록 너머 우주' 기록 체계 기술서
## 1. 📑 노트의 속성 구조 │ Note Properties

```yaml
---
aliases: [Alternative Names]
tags:
  - type/
  - context/
  - theme/
  - status/
  - prioritization/
  - review/
Related Links:
  - [[]]
  - [[]]
date: 2025-02-20
last_updated: 2025-08-15
---
```
---
## 2. 🏷️ 태깅 체계 │ Tagging System

<u>☆★ 일관성 유지와 용이한 검색을 위해 각 파트별로 적합한 태깅 필요 ★☆</u>

### **1) 유형 │ Type**

<span style="background:#fff88f">※ 노트의 기본 성격을 구분</span>
- `#type/daily` : 일일 노트(Daliy Note)
- `#type/fleet` : 임시 노트(Fleeting Note)
- `#type/literature` : 문헌 노트(Literature Note)
- `#type/project` : 프로젝트 노트(Project Note)
-  `#type/permanent` : 영구 노트(Permanent Note)

### **2) 맥락 │ Context**

<span style="background:#d4b106">※ 노트의 내용과 맥락의 파악</span>
- `#context/archiving` :  아카이빙(테마)
- `#context/job` : 직무
- `#context/scholarly` : 학술(전공)
- `#context/studies` : 공부(일반)
- `#context/personal` : 개인

### **3) 주제 │ Theme**

<span style="background:#ff4d4f">※ 지식 및 관심 분야와 주제로 조직</span> 
#### Knowledge
- `#theme/Archives` : <u>기록학│보존 기록(Archival science)</u>
	- `#theme/Archives/` : '보존 기록' 관련 지식 키워드(Keyword)
- `#theme/Daai` : <u>Digital&Data Archives</u> 그리고 AI(Artificial intelligence)
- `#theme/History` : 역사
- `#theme/Humanities` : 인문
- `#theme/Records` : <u>기록학│기록 관리(Records Management)</u>
	- `#theme/Records/` : '기록 관리' 관련 지식 키워드(Keyword)
- `#theme/Social` : 사회
####  Interest
- `#theme/Contents` : 콘텐츠
- `#theme/Health` : 건강
- `#theme/Literacy` :  문해
- `#theme/Music` : 음악
- `#theme/Refinement` : 교양
- `#theme/Relation` : 관계

### **4) 메타데이터 │ Metadata**

<span style="background:#40a9ff">※ 노트의 진행 상태와 우선 순위 및 검토 사항 관리</span>
#### Status(Progress)
- `#status/idea` : 처음의 개념
- `#status/planning` : 계획과 준비
- `#status/in-progress` : 진행 중
- `#status/completed` : 완료 및 평가
#### Prioritization
- `#priority/high` : 다른 무엇보다 <u>긴급한</u> 일
- `#priority/medium` : 긴급하진 않지만 <u>중요한</u> 일
- `#priority/low` : 여유를 갖고 하는 <u>일반적인</u> 일
#### Review Control
- `#review/pending` : 검토 대기
- `#review/completed` : 검토 완료
- `#review/needed` : 재검토 필요

## 3.  🌐 링크의 사용 │ Using Link

### **1) 링크 유형 │ Link Type**
#### 직접적인 링크
- Syntax : `[[Note Name]]`
- Usage : 다른 노트에 직접 연결
#### 별칭 링크
- Syntax : `[[Note Name|Displayed Text]]`
- Usage : 노트 제목과 다른 별칭을 설정하여 표시
#### 섹션 링크
 - Syntax : `[[Note Name#Section]]`
- Usage : 노트의 특정 섹션으로 이동

### **2) 링크 연결 원칙 | Link connection method**
#### 의미 있는 연결 Meaningful Connections
- 해당 주제와 직간접적으로 관련있을 때 링크 연결
- 주의를 분산시킬 수 있는 과도한 링크 지양
#### 인덱스 노트 [[docs/plugins/index|Index]] Notes (MOCs)
- 콘텐츠 지도 구축
- 링크 통해 관련 테마 정리
- Example: A "[[]]" note with links to all related projects
#### 양방향 링크
- 자동 백링크 활용
- 주기적인 백링크 검토를 통한 새로운 연결 발견
#### 링크를 통한 계층 구조
- 링크로 유연한 계층 구조 형성
- Example: `[[Programming]]` → `[[Algorithms]]` → `[[Sorting]]
