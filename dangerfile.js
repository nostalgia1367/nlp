import { fail, warn, message, markdown, danger } from 'danger';

if (danger.github.pr.body.length < 10) {
  fail('해당 PR에는 설명이 부족합니다.');
}

const isWIP = danger.github.pr.title.includes('WIP');

const method = (message, status) => (status ? warn(message) : fail(message));

if (!danger.github.pr.assignee) {
  method('해당 PR에는 Assignee(담당자)가 설정되어 있지 않아요! 보통은 PR 생성자를 할당해주세요!', isWIP);
}

const reviewersCount = danger.github.requested_reviewers.users.length;
if (reviewersCount === 0) {
  method(`🕵 이런! 리뷰어가 아무도 없군요! 한 명의 리뷰어를 꼭 추가해주세요!`, isWIP);
} else if (reviewersCount > 1) {
  warn(`${reviewersCount} 명의 리뷰어가 있군요. 훌륭합니다! 최소 한명의 리뷰어가 해당 리뷰를 리드해주셔야 해요! 잊지마세요!`);
}

if (danger.github.pr.deletions > danger.github.pr.additions) {
  message(`👏 굳잡! 추가된 코드 라인보다 제거된 라인이 더 많이 보이네요. 계속 Lean하게 유지해보아요!`);
}

var bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(':exclamation: Big PR');
  markdown('🤷‍♀️PR 사이즈가 상대적으로 커보입니다. 만약 PR의 여러 이슈 및 변화를 가지고 있다면, 각각의 PR로 나누는게 훨씬 더 빠르고 쉽게 리뷰를 할 수 있게 도와줘요.');
}
