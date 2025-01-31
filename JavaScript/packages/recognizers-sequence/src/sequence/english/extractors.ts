import { BasePhoneNumberExtractor, BaseIpExtractor, BaseMentionExtractor, BaseHashtagExtractor, BaseEmailExtractor, BaseURLExtractor, BaseGUIDExtractor } from "../extractors";
import { ExtractResult, RegExpUtility } from "@microsoft/recognizers-text";
import { BasePhoneNumbers } from "../../resources/basePhoneNumbers";
import { BaseURL } from "../../resources/baseURL";
import { IURLExtractorConfiguration } from "../extractors";

export class PhoneNumberExtractor extends BasePhoneNumberExtractor{
    extract(source: string): Array<ExtractResult> {
        var result = super.extract(source);
        var maskRegex = new RegExp(BasePhoneNumbers.PhoneNumberMaskRegex, "g");
        var m;
        while ((m = maskRegex.exec(source)) != null) {
            for (var i = result.length - 1; i >= 0; --i) {
                if (result[i].start >= m.index && result[i].start + result[i].length <= m.index + m[0].length) {
                    result.splice(i, 1);
                }
            }
        }
        return result;
    }
}

export class IpExtractor extends BaseIpExtractor{

}

export class MentionExtractor extends BaseMentionExtractor{

}

export class HashtagExtractor extends BaseHashtagExtractor{

}

export class EmailExtractor extends BaseEmailExtractor{

}

export class EnglishURLExtractorConfiguration implements IURLExtractorConfiguration {
    readonly UrlRegex: RegExp;
    readonly IpUrlRegex: RegExp;

    constructor() {
        this.UrlRegex = RegExpUtility.getSafeRegExp(BaseURL.UrlRegex);
        this.IpUrlRegex = RegExpUtility.getSafeRegExp(BaseURL.IpUrlRegex);
    }
}

export class GUIDExtractor extends BaseGUIDExtractor {

}