jest.unmock('../splitSentence.js')

import splitSentence from '../splitSentence'

test('Split sentences', () => {
  let text = '影像感知来自于两个方面，一个是摄影机，一个是角色。因而，感知的失效也就有两种原因：要么是摄影机本身设置了一种不介入的视角，从而使得观众对影像的真切感知不再可能；要么是角色对自身所处情境失去了正常的感知能力。前一种暂且不表，此处只谈及角色感知失效的情形，同样有两种形式。'

  expect(splitSentence(text)).toEqual(
    [ "影像感知来自于两个方面，一个是摄影机，一个是角色。"
    , "因而，感知的失效也就有两种原因：要么是摄影机本身设置了一种不介入的视角，从而使得观众对影像的真切感知不再可能；"
    , "要么是角色对自身所处情境失去了正常的感知能力。"
    , "前一种暂且不表，此处只谈及角色感知失效的情形，同样有两种形式。"
    ]
  )
})